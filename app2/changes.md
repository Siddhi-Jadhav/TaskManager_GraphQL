# REST to GraphQL transaction

- install the dependencies

```bash
> yarn add @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

- remove the controllers
- add types
- add resolvers

## project setting


## Users
- remove UserController
- add User Type

```typescript
@ObjectType('User')
export class UserType {
  @Field((type) => ID)
  id: number;

  @Field()
  username: string;
}
```
- add the resolver
## Tasks