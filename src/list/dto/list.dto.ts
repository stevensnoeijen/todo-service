import {
  FilterableField,
  FilterableOffsetConnection,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { TodoDto } from '../../todo/dto/todo.dto';

@ObjectType('List')
@FilterableOffsetConnection('todos', () => TodoDto)
export class ListDto {
  @IDField(() => ID)
  id!: number;

  @FilterableField(() => GraphQLISODateTime)
  created!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updated!: Date;

  @FilterableField()
  title!: string;
}
