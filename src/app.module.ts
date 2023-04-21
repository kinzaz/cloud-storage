import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'snuffleupagus.db.elephantsql.com',
      port: 5432,
      username: 'nfxutejw',
      password: 'Z_3f7muZgbwEOZ8SLOSRCfz2cFrimNcK',
      database: 'nfxutejw',
      entities: [],
      synchronize: true,
    }),
    UsersModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
