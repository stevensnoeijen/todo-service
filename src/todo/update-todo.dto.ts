import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('UpdateTodo')
export class UpdateTodoDto {
  @Field()
  @IsString()
  title!: string;
}
