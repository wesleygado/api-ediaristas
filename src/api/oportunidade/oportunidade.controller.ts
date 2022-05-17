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
import { OportunidadeService } from './oportunidade.service';
import TipoUsuario from 'src/api/usuarios/enum/tipoUsuario-enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { DiariaResponseDto } from 'src/api/diarias/dto/diaria-response.dto';

@Controller('api/oportunidades')
export class OportunidadeController {
  constructor(private readonly oportunidadeService: OportunidadeService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.DIARISTA)
  async buscarOportunidades(@GetUser() usuarioLogado: UsuarioApi) {
    return await this.oportunidadeService.buscarOportunidades(usuarioLogado);
  }
}
