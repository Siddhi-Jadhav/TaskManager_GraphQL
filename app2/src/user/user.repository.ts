import { UserInput } from './type/user.input';
import { UserEntity } from './user.entity';
import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDTO } from './dto/auth.credentials.dto';
import * as crypto from 'crypto-js';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async signup(userInput: UserInput) {
    //create a row for user table
    const user = new UserEntity();
    user.username = userInput.username;
    //encrypt the password
    user.password = `${crypto.MD5(userInput.password)}`;

    await user.save();

    //return the current user
    return user;
  }

  async signin(userInput: UserInput) {
    const { username, password } = userInput;

    //find user by user name
    const user = await this.findOne({ username });
    console.log(user);

    if (!user) {
      return null;
    }

    // check if user exist
    if (!user.validatePassword(password)) {
      return null;
    }

    return user;
  }
}
