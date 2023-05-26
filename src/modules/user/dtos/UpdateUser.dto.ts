import {
  IsStrongPassword,
  IsNotEmpty,
  IsOptional,
  IsEmail,
} from 'class-validator';

import { UniqueEmail } from '../validators';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado não é válido.' })
  @UniqueEmail({ message: 'Já existe um usuário com este e-maiol.' })
  @IsOptional()
  email: string;

  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    { message: 'A senha precisa atender aos requisitos' },
  )
  @IsOptional()
  password: string;
}
