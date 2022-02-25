import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, Injectable } from '@nestjs/common';
@Injectable()
export class GQLAuthguard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    //create a new graphql context using the default context
    const ctx = GqlExecutionContext.create(context);

    //return the GraphQL context request
    return ctx.getContext().req;
  }
}
