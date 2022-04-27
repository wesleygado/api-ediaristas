import { Controller, Get, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import TipoUsuario from 'src/usuarios/enum/tipoUsuario-enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';
import { HateoasIndex } from 'src/core/hateoas/hateoas-index';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';
import { UsuarioResponseDto } from 'src/usuarios/dtos/usuario-response.dto';

@Controller('api/me')
export class MeController {
  constructor(
    private readonly meService: MeService,
    private hateOas: HateoasUsuario,
  ) {}

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  me(@GetUser() usuario: UsuarioApi): Promise<UsuarioResponseDto> {
    return this.meService.obterUsuarioLogado(usuario);
  }
}
