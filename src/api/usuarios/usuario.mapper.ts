import { Foto } from 'src/api/fotos/entities/foto.entity';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioCadastroResponseDto } from './dtos/usuario-cadastro-response.dto';
import { UsuarioApi } from './entities/usuario.entity';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { JwtTokens } from 'src/auth/strategies/jwt-tokens';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/strategies/jwt-payload.interface';

@Injectable()
export class UsuarioMapper {
  constructor(private jwtTokens: JwtTokens) {}
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
    usuarioDTO.reputacao = usuario.reputacao;
    if (usuario.tipoUsuario === 1) {
      usuarioDTO.fotoDocumento = foto;
    }
    if (usuario.tipoUsuario === 2) {
      usuarioDTO.fotoUsuario = foto;
    }
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
    return usuarioDTO;
  }

  async toUsuarioCadastroResponseDto(
    usuario: UsuarioApi,
  ): Promise<UsuarioCadastroResponseDto> {
    const usuarioDTO = new UsuarioCadastroResponseDto();
    usuarioDTO.id = usuario.id;
    usuarioDTO.nomeCompleto = usuario.nomeCompleto;
    usuarioDTO.email = usuario.email;
    usuarioDTO.tipoUsuario = usuario.tipoUsuario;
    usuarioDTO.cpf = usuario.cpf;
    usuarioDTO.nascimento = usuario.nascimento;
    usuarioDTO.telefone = usuario.telefone;
    usuarioDTO.chavePix = usuario.chavePix;
    return usuarioDTO;
  }
}
