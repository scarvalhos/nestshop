import { IsStrongPassword, IsNotEmpty, IsEmail } from 'class-validator';
import { UniqueEmail } from '../validators';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado não é válido.' })
  @UniqueEmail({ message: 'Já existe um usuário com este e-maiol.' })
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
  password: string;
}
