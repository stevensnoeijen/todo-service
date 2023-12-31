import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';

import { TodoDto } from './dto/todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

import { TodoEntity } from './todo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from '../auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeOrmModule = TypeOrmModule.forFeature([TodoEntity]);

@Module({
  imports: [
    typeOrmModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [AuthModule, NestjsQueryTypeOrmModule.forFeature([TodoEntity])],
      resolvers: [
        {
          EntityClass: TodoEntity,
          DTOClass: TodoDto,
          CreateDTOClass: CreateTodoDto,
          UpdateDTOClass: UpdateTodoDto,
          guards: [AuthGuard],
        },
      ],
    }),
  ],
  exports: [typeOrmModule],
})
export class TodoModule {}
