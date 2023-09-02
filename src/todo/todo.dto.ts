import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, ID } from '@nestjs/graphql';

@ObjectType('Todo')
export class TodoDto {
  @IDField(() => ID)
  id!: number;

  @FilterableField()
  title!: string;
}
