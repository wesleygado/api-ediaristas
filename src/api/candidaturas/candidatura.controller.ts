import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import TipoUsuario from 'src/api/usuarios/enum/tipoUsuario-enum';
import { CandidaturaService } from './candidatura.service';

@Controller('api/diarias')
export class CandidaturaController {
  constructor(private readonly candidaturaService: CandidaturaService) {}

  @Post(':id/candidatar')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.DIARISTA)
  candidatar(
    @Param('id') id: number,
    @GetUser() usuarioLogado: UsuarioApi,
  ): Promise<{ mensagem: string }> {
    return this.candidaturaService.candidatar(id, usuarioLogado);
  }
}
