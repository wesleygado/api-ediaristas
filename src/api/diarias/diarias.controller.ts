import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ValidatorDiariaUsuario } from 'src/core/validators/diaria/validator-diaria-usuario';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { TipoUsuario } from 'src/api/usuarios/enum/tipoUsuario-enum';
import { DiariaMapper } from './diaria.mapper';
import { DiariasService } from './diarias.service';
import { DiariaRequestDto } from './dto/diaria-request.dto';

@Controller('api/diarias')
export class DiariasController {
  constructor(
    private readonly diariasService: DiariasService,
    private diariaMapper: DiariaMapper,
    private validarUsuario: ValidatorDiariaUsuario,
  ) {}

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
}
