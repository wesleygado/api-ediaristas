import { Controller, Get, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';
import { UsuarioResponseDto } from 'src/api/usuarios/dtos/usuario-response.dto';

@Controller('api/me')
export class MeController {
  constructor(
    private readonly meService: MeService,
    private hateOas: HateoasUsuario,
  ) {}

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  async me(@GetUser() usuario: UsuarioApi): Promise<UsuarioResponseDto> {
    const me = await this.meService.obterUsuarioLogado(usuario);
    me.links = this.hateOas.gerarLinksHateoas(usuario.tipoUsuario);
    return me;
  }
}
