import { SigninResponse } from './type/signin.respone';
import { UserInput } from './type/user.input';
import { UserService } from './user.service';
import { UserType } from './type/user.type';
import { GQLAuthguard } from './gql.authguard';
import { UseGuards } from '@nestjs/common';
import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { GetUser } from './get.user.decorator';
import { UserEntity } from './user.entity';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private UserService: UserService) {}
  //create, update, delete are considered as mutation
  @Mutation((returns) => UserType)
  signup(@Args('input') input: UserInput) {
    return this.UserService.signup(input);
  }

  @Mutation((returns) => SigninResponse)
  signin(@Args('input') input: UserInput) {
    return this.UserService.signin(input);
  }

  @Query((returns) => UserType)
  @UseGuards(GQLAuthguard)
  profile(@GetUser() user: UserEntity) {
    return user;
  }
}
