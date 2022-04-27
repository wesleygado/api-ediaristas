import { Injectable } from '@nestjs/common';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';
import { UsuarioCadastroResponseDto } from 'src/usuarios/dtos/usuario-cadastro-response.dto';
import { UsuarioMapper } from 'src/usuarios/usuario.mapper';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';

@Injectable()
export class MeService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private mapper: UsuarioMapper,
    private hateOas: HateoasUsuario,
  ) {}

  async obterUsuarioLogado(usuario) {
    const usuarioLogado = await this.usuarioRepository.findOne({
      email: usuario.email,
    });

    const usuarioMe = this.mapper.toUsuarioResponseDto(usuarioLogado);
    usuarioMe.links = this.hateOas.gerarLinksHateoas(usuarioLogado.tipoUsuario);

    return usuarioMe;
  }
}
