import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { ClienteResponseDto } from './dto/cliente-response.dto';

export class ClienteMapper {
  toResponse(usuario: UsuarioApi): ClienteResponseDto {
    const clienteDTO = new ClienteResponseDto();
    clienteDTO.id = usuario.id;
    clienteDTO.nascimento = usuario.nascimento;
    clienteDTO.nomeCompleto = usuario.nomeCompleto;
    clienteDTO.reputacao = usuario.reputacao;
    clienteDTO.telefone = usuario.telefone;
    clienteDTO.tipoUsuario = usuario.tipoUsuario;

    if (!usuario.fotoUsuario) {
      clienteDTO.fotoUsuario = null;
    } else {
      clienteDTO.fotoUsuario = usuario.fotoUsuario.url;
    }
    return clienteDTO;
  }
}
