import TipoUsuario from '../enum/tipoUsuario-enum';

export class UsuarioResponseDto {
  id: number;
  nomeCompleto: string;
  email: string;
  senha: string;
  tipoUsuario: TipoUsuario;
  cpf: string;
  nascimento: Date;
  telefone: string;
  chavePix: string;
}
