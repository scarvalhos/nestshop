import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Get,
} from '@nestjs/common';

import { CreateUserDto, ListUserDto, UpdateUserDto } from '../dtos';
import { UserRepository } from '../repositories';
import { UserEntity } from '../entities';

import { v4 as uuid } from 'uuid';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() payload: CreateUserDto) {
    const userEntity = new UserEntity();

    userEntity.id = uuid();
    userEntity.name = payload.name;
    userEntity.email = payload.email;
    userEntity.password = payload.password;

    await this.userRepository.saveUser(userEntity);

    return {
      message: 'User created successfully.',
      user: new ListUserDto(userEntity.id, userEntity.name),
    };
  }

  @Get()
  async listUsers() {
    const usersList = await this.userRepository.getUsers();

    const parsedUsersList = usersList.map(
      (user) => new ListUserDto(user.id, user.email),
    );

    return {
      message: 'Users listed successfully.',
      users: parsedUsersList,
    };
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    const userUpdated = await this.userRepository.updateUser(id, payload);

    return {
      message: 'User updated successfully.',
      user: userUpdated,
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    await this.userRepository.deleteUser(id);

    return {
      message: `User #${id} deleted successfully.`,
    };
  }
}
