import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';
import TipoUsuario from 'src/usuarios/enum/tipoUsuario-enum';
import { EnderecoDiaristaRequestDto } from './dto/endereco-diarista-request.dto';
import { EnderecoDiaristaService } from './endereco-diarista.service';

@Controller('api/usuarios')
export class EnderecoDiaristaController {
  constructor(
    private readonly enderecoDiaristaService: EnderecoDiaristaService,
  ) {}

  @Put('endereco')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.DIARISTA)
  atualizarEndereco(
    @Body() enderecoDiarista: EnderecoDiaristaRequestDto,
    @GetUser() usuarioLogado: UsuarioApi,
  ) {
    return this.enderecoDiaristaService.alterarEndereco(
      enderecoDiarista,
      usuarioLogado,
    );
  }

  @Get('endereco')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.DIARISTA)
  exibirEndereco(@GetUser() usuarioLogado: UsuarioApi) {
    return this.enderecoDiaristaService.exibirEndereco(usuarioLogado);
  }
}
