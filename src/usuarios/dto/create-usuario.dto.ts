import TipoUsuario from '../enum/tipoUsuario-enum';

export class CreateUsuarioDto {
  nomeCompleto: string;

  email: string;

  senha: string;

  tipoUsuario: TipoUsuario;
}
