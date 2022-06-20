import { Controller, Get, UseGuards } from '@nestjs/common';
import { MeService } from './me.service';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';
import { UsuarioResponseDto } from 'src/api/usuarios/dtos/usuario-response.dto';
import { DiaristaIndiceService } from 'src/core/services/diarista-indice/diarista-indice.service';
import { DiariaRepository } from '../diarias/diaria.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('api/me')
export class MeController {
  constructor(
    private readonly meService: MeService,
    private hateOas: HateoasUsuario,
    private googleMatrix: DiaristaIndiceService,
    @InjectRepository(DiariaRepository)
    private diaria: DiariaRepository,
  ) {}

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  me(@GetUser() usuario: UsuarioApi): Promise<UsuarioResponseDto> {
    return this.meService.obterUsuarioLogado(usuario);
  }

  @Get('teste')
  async teste() {
    const diaria = await this.diaria.getAptasParaSelecaoDiarista();
    return diaria;
  }
}
