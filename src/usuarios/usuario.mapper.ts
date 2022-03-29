import { Foto } from 'src/fotos/entities/foto.entity';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { UsuarioApi } from './entities/usuario.entity';

export class UsuarioMapper {
  toUsuarioRequestDto(
    usuario: UsuarioRequestDto,
    foto: Foto,
  ): UsuarioRequestDto {
    const usuarioDTO = new UsuarioRequestDto();

    usuarioDTO.nomeCompleto = usuario.nomeCompleto;
    usuarioDTO.email = usuario.email;
    usuarioDTO.password = usuario.password;
    usuarioDTO.passwordConfirmation = usuario.passwordConfirmation;
    usuarioDTO.tipoUsuario = usuario.tipoUsuario;
    usuarioDTO.cpf = usuario.cpf;
    usuarioDTO.nascimento = usuario.nascimento;
    usuarioDTO.telefone = usuario.telefone;
    usuarioDTO.chavePix = usuario.chavePix;
    usuarioDTO.fotoUsuario = foto;

    return usuarioDTO;
  }

  toUsuarioResponseDto(usuario: UsuarioApi): UsuarioResponseDto {
    const usuarioDTO = new UsuarioResponseDto();
    usuarioDTO.id = usuario.id;
    usuarioDTO.nomeCompleto = usuario.nomeCompleto;
    usuarioDTO.email = usuario.email;
    usuarioDTO.tipoUsuario = usuario.tipoUsuario;
    usuarioDTO.cpf = usuario.cpf;
    usuarioDTO.nascimento = usuario.nascimento;
    usuarioDTO.telefone = usuario.telefone;
    usuarioDTO.chavePix = usuario.chavePix;
    usuarioDTO.fotoUsuario = usuario.fotoUsuario;

    return usuarioDTO;
  }
}
