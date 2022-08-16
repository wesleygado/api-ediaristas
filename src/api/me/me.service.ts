import { Injectable } from '@nestjs/common';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';
import { UsuarioMapper } from 'src/api/usuarios/usuario.mapper';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MeService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private hateOas: HateoasUsuario,
    private mapper: UsuarioMapper,
  ) {}

  async obterUsuarioLogado(usuario) {
    const usuarioLogado = await this.usuarioRepository.repository.findOneBy({
      email: usuario.email,
    });

    const usuarioMe = this.mapper.toUsuarioResponseDto(usuarioLogado);
    usuarioMe.links = await this.hateOas.gerarLinksHateoas(
      usuarioLogado.tipoUsuario,
    );

    return usuarioMe;
  }
}
