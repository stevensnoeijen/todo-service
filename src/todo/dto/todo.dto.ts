import {
  FilterableField,
  FilterableOffsetConnection,
  FilterableRelation,
  IDField,
} from '@ptc-org/nestjs-query-graphql';
import { ObjectType, ID, GraphQLISODateTime, Field } from '@nestjs/graphql';

import { ListDto } from '../../list/dto/list.dto';

@ObjectType('Todo')
@FilterableRelation('list', () => ListDto)
@FilterableRelation('parent', () => TodoDto, { nullable: true })
@FilterableOffsetConnection('children', () => TodoDto)
export class TodoDto {
  @IDField(() => ID)
  id!: number;

  @FilterableField(() => GraphQLISODateTime)
  created!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updated!: Date;

  @FilterableField(() => ID, {
    name: 'list_id',
  })
  listId!: number;

  @FilterableField()
  title!: string;

  @FilterableField(() => GraphQLISODateTime, {
    nullable: true,
  })
  completed!: Date | null;

  @Field()
  googleId: number | null;
}
