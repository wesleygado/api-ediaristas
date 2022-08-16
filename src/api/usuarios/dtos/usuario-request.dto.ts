import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
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
import { EnderecoDiarista } from 'src/api/endereco-diarista/entities/endereco-diarista.entity';
import { Foto } from 'src/api/fotos/entities/foto.entity';
import { CpfValido } from 'src/core/validators/diaria/validar-cpf-valido';

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
  @IsNumberString()
  tipoUsuario: number;

  @Length(11, 11, { message: 'CPF deve possuir 11 caracteres' })
  @Validate(CpfJaExiste)
  @Validate(CpfValido)
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
  @Expose({ name: 'chave_pix' })
  @Validate(ChavePixJaExiste)
  chavePix: string;

  @IsOptional()
  @Expose({ name: 'foto_documento' })
  fotoDocumento: Foto;

  @IsOptional()
  @Expose({ name: 'foto_usuario' })
  fotoUsuario: Foto;

  @IsOptional()
  @Expose()
  endereco: EnderecoDiarista;
}
