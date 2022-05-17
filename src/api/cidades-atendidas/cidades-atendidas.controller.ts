import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { DiariaRequestDto } from 'src/api/diarias/dto/diaria-request.dto';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import TipoUsuario from 'src/api/usuarios/enum/tipoUsuario-enum';
import { CidadesAtendidasService } from './cidades-atendidas.service';
import { CidadeAtendidaResponseDto } from './dto/cidade-atendida-response.dto';
import { CidadesAtendidasRequestDto } from './dto/cidades-atendidas-request.dto copy';

@Controller('api/usuarios')
export class CidadesAtendidasController {
  constructor(private readonly cidadesService: CidadesAtendidasService) {}

  @Get('cidades-atendidas')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.DIARISTA)
  listarCidadesAtendidas(
    @GetUser() usuario: UsuarioApi,
  ): CidadeAtendidaResponseDto[] {
    return this.cidadesService.listarCidadesAtendidas(usuario);
  }

  @Put('cidades-atendidas')
  @UseGuards(AuthGuard('jwt'))
  @Roles(TipoUsuario.DIARISTA)
  atualizarCidadesAtendidas(
    @GetUser() usuario: UsuarioApi,
    @Body() request: CidadesAtendidasRequestDto,
  ): Promise<string> {
    return this.cidadesService.atualizarCidadesAtendidas(request, usuario);
  }
}
