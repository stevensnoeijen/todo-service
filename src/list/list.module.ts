import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { ListEntity } from './list.entity';
import { ListDto } from './dto/list.dto';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ListEntity])],
      resolvers: [
        {
          EntityClass: ListEntity,
          DTOClass: ListDto,
          CreateDTOClass: CreateListDto,
          UpdateDTOClass: UpdateListDto,
        },
      ],
    }),
  ],
})
export class ListModule {}
