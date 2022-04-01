import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { ChavePixJaExiste } from 'src/core/validators/usuario/validator-chave-pix';
import { CpfJaExiste } from 'src/core/validators/usuario/validator-cpf';
import { EmailJaExiste } from 'src/core/validators/usuario/validator-email';
import { IdadeValida } from 'src/core/validators/usuario/validator-idade';
import { Foto } from 'src/fotos/entities/foto.entity';
import TipoUsuario from '../enum/tipoUsuario-enum';

export class UsuarioRequestDto {
  id: number;

  @MinLength(3, { message: 'Nome deve possuir mais de 3 caracteres' })
  @MaxLength(255, { message: 'Nome deve possuir menos de 255 caracteres' })
  @Expose({ name: 'nome_completo' })
  nomeCompleto: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Email deve possuir mais de 3 caracteres' })
  @MaxLength(255, { message: 'Email deve possuir menos de 255 caracteres' })
  @IsEmail({}, { message: 'Digite um email válido' })
  @Validate(EmailJaExiste)
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Expose({ name: 'password_confirmation' })
  passwordConfirmation: string;

  @IsNotEmpty()
  @Expose({ name: 'tipo_usuario' })
  tipoUsuario: TipoUsuario;

  @MinLength(11, { message: 'CPF deve possuir 11 caracteres' })
  @MaxLength(11, { message: 'CPF deve possuir 11 caracteres' })
  @Validate(CpfJaExiste)
  cpf: string;

  @IsNumber()
  @IsOptional()
  reputacao: number;

  @IsDateString('', { message: 'Nascimento deve ser uma data valida' })
  @Validate(IdadeValida)
  nascimento: Date;

  @IsNotEmpty()
  @Length(11, 11, { message: 'Telefone deve ter 11 caracteres' })
  telefone: string;

  @IsOptional()
  @Length(11, 11, { message: 'Chave Pix deve ter 11 caracteres' })
  @Expose({ name: 'chave_pix' })
  @Validate(ChavePixJaExiste)
  chavePix: string;

  @Expose({ name: 'foto_usuario' })
  fotoUsuario: Foto;
  /* fotoDocumento: Foto; */
}
