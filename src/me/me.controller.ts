import { Controller, Get, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import TipoUsuario from 'src/usuarios/enum/tipoUsuario-enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';

@Controller('api/me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(TipoUsuario.DIARISTA, TipoUsuario.CLIENTE)
  me(@GetUser() usuario: UsuarioApi) {
    return this.meService.obterUsuarioLogado(usuario);
  }
}
