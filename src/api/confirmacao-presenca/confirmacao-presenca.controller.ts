import { Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import TipoUsuario from 'src/api/usuarios/enum/tipoUsuario-enum';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ConfirmacaoPresencaService } from './confirmacao-presenca.service';

@Controller('api/diarias/:id/confirmar-presenca')
export class ConfirmacaoPresencaController {
  constructor(private readonly confirmacao: ConfirmacaoPresencaService) {}

  @Patch()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.CLIENTE)
  confirmacaoPresenca(@Param('id') id: number, @GetUser() usuario: UsuarioApi) {
    return this.confirmacao.confirmacaoPresenca(id, usuario);
  }
}
