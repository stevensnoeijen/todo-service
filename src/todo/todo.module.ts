import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { TodoEntity } from './todo.entity';
import { TodoDto } from './todo.dto';
import { CreateTodoDto } from './create-todo.dto';
import { UpdateTodoDto } from './update-todo.dto';

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
