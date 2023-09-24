import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

const typeOrmModule = TypeOrmModule.forFeature([UserEntity]);

@Module({
  imports: [typeOrmModule],
  exports: [typeOrmModule],
})
export class UserModule {}
