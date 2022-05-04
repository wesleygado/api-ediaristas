import TipoUsuario from '../enum/tipoUsuario-enum';
import { Expose } from 'class-transformer';
import { HateoasLinks } from 'src/core/hateoas/hateoas.interface';

export class UsuarioResponseDto {
  id: number;

  @Expose({ name: 'nome_completo' })
  nomeCompleto: string;

  email: string;

  senha: string;

  @Expose({ name: 'tipo_usuario' })
  tipoUsuario: number;

  cpf: string;

  nascimento: Date;

  telefone: string;

  @Expose({ name: 'chave_pix' })
  chavePix: string;

  links: HateoasLinks[];
}
