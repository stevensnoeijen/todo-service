import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RelationDto {
  @Field(() => ID)
  id: number;
}
