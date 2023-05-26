import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async saveUser(user: UserEntity) {
    return this.users.push(user);
  }

  async getUsers() {
    return this.users;
  }

  async userEmailAlreadyExists(email: string) {
    return this.users.some((user) => user.email === email);
  }
}
