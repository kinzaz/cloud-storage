import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity, FileType } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  findAll(userId: number, fileType: FileType) {
    const qb = this.fileRepository.createQueryBuilder('file');
    qb.where('file.userId = :userId', { userId });
    if (fileType === FileType.PHOTOS) {
      qb.andWhere('file.mimeType ILIKE :type', { type: '%image%' });
    }
    if (fileType === FileType.TRASH) {
      qb.withDeleted().andWhere('file.deletedAt IS NOT NULL');
    }
    return qb.getMany();
  }

  create(file: Express.Multer.File, userId: number) {
    return this.fileRepository.save({
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      user: { id: userId },
    });
  }

  async remove(userId: number, ids: string) {
    const idsArray = ids.split(',');
    const qb = this.fileRepository.createQueryBuilder('file');
    qb.where('id IN (:...ids) AND userId = :userId', {
      ids: idsArray,
      userId,
    });
    return qb.softDelete().execute();
  }
}
