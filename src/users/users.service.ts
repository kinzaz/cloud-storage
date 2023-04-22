import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({
      email,
    });
  }

  async findById(id: number) {
    return await this.userRepository.findOneBy({
      id,
    });
  }

  create(dto: CreateUserDto) {
    return this.userRepository.save(dto);
  }
}
