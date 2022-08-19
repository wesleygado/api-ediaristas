import { Injectable } from '@nestjs/common';
import { UsuarioMapper } from 'src/api/usuarios/usuario.mapper';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';

@Injectable()
export class MeService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private mapper: UsuarioMapper,
  ) {}

  async obterUsuarioLogado(usuario) {
    const usuarioLogado = await this.usuarioRepository.repository.findOneBy({
      email: usuario.email,
    });

    const usuarioMe = this.mapper.toUsuarioResponseDto(usuarioLogado);

    return usuarioMe;
  }
}
