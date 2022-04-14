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
    const usuarioLogado = await this.usuarioRepository.findOne({
      email: usuario.email,
    });
    return this.mapper.toUsuarioResponseDto(usuarioLogado);
  }
}
