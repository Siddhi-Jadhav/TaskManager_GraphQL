import { UserInput } from './type/user.input';
import { UserResolver } from './user.resolver';
import { JwtStratergy } from './jwt.stratergy';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GQLAuthguard } from './gql.authguard';

@Module({
  imports: [
    //for JWT dependency
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    //for passport
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    //for TypeORM dependency
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [],
  providers: [UserService, JwtStratergy, UserResolver, UserInput, GQLAuthguard],
  //to use this providers in the TaskModule
  exports: [JwtStratergy, PassportModule, GQLAuthguard],
})
export class UserModule {}
