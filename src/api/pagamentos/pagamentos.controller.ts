import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import TipoUsuario from '../usuarios/enum/tipoUsuario-enum';
import { PagamentoRequestDto } from './dto/paramento-request.dto';
import { PagamentosService } from './pagamentos.service';

@Controller('api/diarias')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Post(':id/pagar')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(TipoUsuario.CLIENTE)
  async pagar(
    @Body() pagamentoRequestDto: PagamentoRequestDto,
    @Param('id') id: number,
    @GetUser() usuarioLogado: UsuarioApi,
  ) {
    return await this.pagamentosService.pagar(
      pagamentoRequestDto,
      id,
      usuarioLogado,
    );
  }
}
