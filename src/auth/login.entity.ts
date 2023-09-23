import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginEntity {
  @Field()
  access_token: string;
}
