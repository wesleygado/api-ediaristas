import TipoUsuario from '../enum/tipoUsuario-enum';
import { Expose } from 'class-transformer';
import { Foto } from 'src/fotos/entities/foto.entity';

export class UsuarioResponseDto {
  id: number;

  @Expose({ name: 'nome_completo' })
  nomeCompleto: string;

  email: string;

  senha: string;

  @Expose({ name: 'tipo_usuario' })
  tipoUsuario: TipoUsuario;

  cpf: string;

  nascimento: Date;

  telefone: string;

  @Expose({ name: 'chave_pix' })
  chavePix: string;

  @Expose({ name: 'foto_usuario' })
  fotoUsuario: Foto;
}
