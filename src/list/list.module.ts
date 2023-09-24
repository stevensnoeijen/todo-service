import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { AuthGuard } from '../auth/auth.guard';
import { AuthModule } from '../auth/auth.module';

import { ListDto } from './dto/list.dto';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { ListEntity } from './list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmModule = TypeOrmModule.forFeature([ListEntity]);

@Module({
  imports: [
    typeOrmModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [AuthModule, NestjsQueryTypeOrmModule.forFeature([ListEntity])],
      resolvers: [
        {
          EntityClass: ListEntity,
          DTOClass: ListDto,
          CreateDTOClass: CreateListDto,
          UpdateDTOClass: UpdateListDto,
          guards: [AuthGuard],
        },
      ],
    }),
  ],
  exports: [typeOrmModule],
})
export class ListModule {}
