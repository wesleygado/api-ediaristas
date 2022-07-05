import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { TipoUsuario } from 'src/api/usuarios/enum/tipoUsuario-enum';
import { DiariasService } from './diarias.service';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import { DiariaCancelamentoRequestDto } from './dto/diaria-cancelamento-request.dto';

@Controller('api/diarias')
export class DiariasController {
  constructor(private readonly diariasService: DiariasService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.CLIENTE)
  cadastrar(
    @Body() diariaRequestDto: DiariaRequestDto,
    @GetUser() usuario: UsuarioApi,
  ) {
    return this.diariasService.cadastrar(diariaRequestDto, usuario);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listarDiarias(@GetUser() usuario: UsuarioApi) {
    return await this.diariasService.listarPorUsuarioLogado(usuario);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.CLIENTE, TipoUsuario.DIARISTA)
  async buscarPorId(@GetUser() usuario: UsuarioApi, @Param('id') id: number) {
    return await this.diariasService.buscarPorId(id, usuario);
  }

  @Patch(':id/cancelar')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.CLIENTE, TipoUsuario.DIARISTA)
  cancelar(
    @Body() diariaCancelamentoRequestDto: DiariaCancelamentoRequestDto,
    @GetUser() usuario: UsuarioApi,
    @Param('id') id: number,
  ): Promise<{ mensagem: string }> {
    return this.diariasService.cancelar(
      id,
      diariaCancelamentoRequestDto,
      usuario,
    );
  }
}
