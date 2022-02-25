import { UserInput } from './type/user.input';
import { JwtPayload } from './jwt.payload';
import { UserRepository } from './user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    //used for creating jwt token
    private jwtService: JwtService,
  ) {}

  async signup(userInput: UserInput) {
    return this.userRepository.signup(userInput);
  }
  async signin(userInput: UserInput) {
    const user = await this.userRepository.signin(userInput);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    //create JWT token
    const payload: JwtPayload = {
      username: user.username,
      id: user.id,
    };

    //create and return the token
    const token = await this.jwtService.sign(payload);

    //return the token and user
    return { token, user };
  }
}
