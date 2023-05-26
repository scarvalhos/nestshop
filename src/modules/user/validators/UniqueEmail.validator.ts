import {
  ValidatorConstraintInterface,
  ValidatorConstraint,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

import { UserRepository } from '../repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(value: string): Promise<boolean> {
    const isUserEmailExisting =
      await this.userRepository.userEmailAlreadyExists(value);

    return !isUserEmailExisting;
  }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
  return (obj: object, property: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: property,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
