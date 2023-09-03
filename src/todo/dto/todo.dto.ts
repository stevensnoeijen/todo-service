import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType('Todo')
export class TodoDto {
  @IDField(() => ID)
  id!: number;

  @FilterableField(() => GraphQLISODateTime)
  created!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updated!: Date;

  @FilterableField()
  title!: string;

  @FilterableField(() => GraphQLISODateTime, {
    nullable: true,
  })
  completed!: Date | null;
}
