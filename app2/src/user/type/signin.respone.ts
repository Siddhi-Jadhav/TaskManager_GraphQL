import { UserType } from './user.type';
import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class SigninResponse {
  @Field()
  token: string;

  @Field()
  user: UserType;
}
