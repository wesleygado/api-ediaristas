import { Controller, Get, UseGuards } from '@nestjs/common';
import { OportunidadeService } from './oportunidade.service';
import TipoUsuario from 'src/api/usuarios/enum/tipoUsuario-enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { HateoasOportunidade } from 'src/core/hateoas/hateoas-oportunidade';

@Controller('api/oportunidades')
export class OportunidadeController {
  constructor(
    private readonly oportunidadeService: OportunidadeService,
    private hateoas: HateoasOportunidade,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.DIARISTA)
  async buscarOportunidades(@GetUser() usuarioLogado: UsuarioApi) {
    const { diariaResponseDto, diaria } =
      await this.oportunidadeService.buscarOportunidades(usuarioLogado);

    for (let i = 0; i < diaria.length; i++) {
      diariaResponseDto[i].links = this.hateoas.gerarLinksHateoas(diaria[i]);
    }
    return diariaResponseDto;
  }
}
