import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import TipoUsuario from '../usuarios/enum/tipoUsuario-enum';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoRequestDto } from './dto/avaliacao-request.dto';
import { AvaliacaoResponseDto } from './dto/avaliacao-response.dto';

@Controller('/api/diarias/:id/avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Patch()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.CLIENTE, TipoUsuario.DIARISTA)
  create(
    @Body() AvaliacaoRequestDto: AvaliacaoRequestDto,
    @GetUser() usuarioLoado: UsuarioApi,
    @Param('id') id: number,
  ) {
    return this.avaliacaoService.avaliarDiaria(
      AvaliacaoRequestDto,
      id,
      usuarioLoado,
    );
  }
}
