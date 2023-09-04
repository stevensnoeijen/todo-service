import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';

import { RelationDto } from '../../shared/relation.dto';

@InputType('CreateTodo')
export class CreateTodoDto {
  @Field(() => RelationDto)
  list!: RelationDto;

  @Field()
  @IsString()
  title!: string;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
  })
  @IsDate()
  @IsOptional()
  completed?: Date | null;
}
