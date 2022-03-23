import { IsDate, IsEmail, IsNotEmpty, Max, Min } from 'class-validator';

import TipoUsuario from '../enum/tipoUsuario-enum';

export class UsuarioRequestDto {
  id: number;

  @Min(3)
  @Max(255)
  nomeCompleto: string;

  @IsNotEmpty()
  @Max(255)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  passwordConfirmation: string;

  @IsNotEmpty()
  tipoUsuario: TipoUsuario;

  @Min(11)
  @Max(11)
  cpf: string;

  @IsDate()
  nascimento: Date;

  @IsNotEmpty()
  @Max(11)
  telefone: string;

  @Min(11)
  @Max(254)
  chavePix: string;
  /* fotoUsuario: Foto; */
  /* fotoDocumento: Foto; */
}
