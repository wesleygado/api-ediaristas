import { Injectable } from '@nestjs/common';
import { UsuarioMapper } from 'src/usuarios/usuario.mapper';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';

@Injectable()
export class MeService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private mapper: UsuarioMapper,
  ) {}

  async obterUsuarioLogado(usuario) {
    const email = usuario.email;
    const usuarioEntity = await this.usuarioRepository.findOne({
      email: email,
    });
    return this.mapper.toUsuarioResponseDto(usuarioEntity);
  }
}
