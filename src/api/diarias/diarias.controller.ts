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
import { HateoasDiaria } from 'src/core/hateoas/hateoas-diaria';

@Controller('api/diarias')
export class DiariasController {
  constructor(
    private readonly diariasService: DiariasService,
    private hateOas: HateoasDiaria,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.CLIENTE)
  async cadastrar(
    @Body() diariaRequestDto: DiariaRequestDto,
    @GetUser() usuario: UsuarioApi,
  ) {
    const { diariaDto, diaria } = await this.diariasService.cadastrar(
      diariaRequestDto,
      usuario,
    );

    diariaDto.links = this.hateOas.gerarLinksHateoas(
      usuario.tipoUsuario,
      diaria,
    );

    return diariaDto;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listarDiarias(@GetUser() usuario: UsuarioApi) {
    return await this.diariasService.listarPorUsuarioLogado(usuario);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async buscarPorId(@GetUser() usuario: UsuarioApi, @Param('id') id: number) {
    const { diariaDto, diaria } = await this.diariasService.buscarPorId(
      id,
      usuario,
    );
    diariaDto.links = await this.hateOas.gerarLinksHateoas(
      usuario.tipoUsuario,
      diaria,
    );
    return diariaDto;
  }

  @Patch(':id/cancelar')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
