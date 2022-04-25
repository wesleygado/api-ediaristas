import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';
import { ClienteModule } from './cliente.module';
import { ClienteResponseDto } from './dto/cliente-response.dto';

export class ClienteMapper {
  toResponse(usuario: UsuarioApi): ClienteResponseDto {
    const clienteDTO = new ClienteResponseDto();
    console.log(usuario);
    clienteDTO.id = usuario.id;
    clienteDTO.nascimento = usuario.nascimento;
    clienteDTO.nomeCompleto = usuario.nomeCompleto;
    clienteDTO.reputacao = usuario.reputacao;
    clienteDTO.telefone = usuario.telefone;
    clienteDTO.tipoUsuario = usuario.tipoUsuario;
    clienteDTO.fotoUsuario = usuario.fotoUsuario.url;

    return clienteDTO;
  }
}
