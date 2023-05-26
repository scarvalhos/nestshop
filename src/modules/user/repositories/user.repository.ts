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

  private findUserByid(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new Error('User not found');

    return user;
  }

  async updateUser(id: string, payload: Partial<UserEntity>) {
    const userToUpdate = this.findUserByid(id);

    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'id') return;
      userToUpdate[key] = value;
    });

    return userToUpdate;
  }

  async deleteUser(id: string) {
    const userToDelete = this.findUserByid(id);

    this.users = this.users.filter((user) => user.id !== id);

    return userToDelete;
  }
}
