import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('CreateTodo')
export class CreateTodoDto {
  @Field()
  @IsString()
  title!: string;
}
