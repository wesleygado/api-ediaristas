import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';
import TipoUsuario from 'src/usuarios/enum/tipoUsuario-enum';
import { DiariasService } from './diarias.service';
import { DiariaRequestDto } from './dto/diaria-request.dto';

@Controller('api/diarias')
export class DiariasController {
  constructor(private readonly diariasService: DiariasService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), new RolesGuard(TipoUsuario.CLIENTE))
  cadastrar(
    @Body() diariaRequestDto: DiariaRequestDto,
    @GetUser() usuario: UsuarioApi,
  ) {
    return this.diariasService.cadastrar(diariaRequestDto, usuario);
  }
}
