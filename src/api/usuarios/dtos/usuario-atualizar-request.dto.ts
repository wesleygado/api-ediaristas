import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';
import { EmailJaExiste } from 'src/core/validators/usuario/validator-email';
import { IdadeValida } from 'src/core/validators/usuario/validator-idade';

export class UsuarioAtualizarRequest {
  @Expose({ name: 'nome_completo' })
  @IsOptional()
  @Length(3, 255)
  nomeCompleto: string;

  @IsOptional()
  @IsEmail()
  @Length(3, 255)
  @Validate(EmailJaExiste)
  email: string;

  @IsOptional()
  @Length(3, 255)
  cpf: string;

  @IsOptional()
  @Validate(IdadeValida)
  @IsDateString('', { message: 'Nascimento deve ser uma data valida' })
  nascimento: Date;

  @IsOptional()
  @Length(11, 11)
  telefone: string;

  @IsOptional()
  @Expose({ name: 'chave_pix' })
  @Length(11, 255)
  chavePix: string;

  @IsOptional()
  @Length(0, 255)
  password: string;

  @IsOptional()
  @Expose({ name: 'new_password' })
  @Length(0, 255)
  newPassword: string;

  @IsOptional()
  @Expose({ name: 'password_confirmation' })
  passwordConfirmation: string;
}
