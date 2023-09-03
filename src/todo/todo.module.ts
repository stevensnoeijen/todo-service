import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { TodoDto } from './dto/todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { TodoEntity } from './todo.entity';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([TodoEntity])],
      resolvers: [
        {
          EntityClass: TodoEntity,
          DTOClass: TodoDto,
          CreateDTOClass: CreateTodoDto,
          UpdateDTOClass: UpdateTodoDto,
        },
      ],
    }),
  ],
})
export class TodoModule {}
