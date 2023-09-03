import { Field, GraphQLISODateTime, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';

@InputType('UpdateTodo')
export class UpdateTodoDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field(() => GraphQLISODateTime, {
    nullable: true,
  })
  @IsDate()
  @IsOptional()
  completed?: Date | null;
}
