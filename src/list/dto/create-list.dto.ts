import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType('CreateList')
export class CreateListDto {
  @Field()
  @IsString()
  title!: string;
}
