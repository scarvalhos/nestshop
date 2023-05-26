import { UniqueEmailValidator } from './validators';
import { UserController } from './controllers';
import { UserRepository } from './repositories';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UniqueEmailValidator],
})
export class UserModule {}
