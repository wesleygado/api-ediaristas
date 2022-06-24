import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DiariaResponseDto } from 'src/api/diarias/dto/diaria-response.dto';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';

@Injectable()
export class ValidatorPagamentoStatus {
  async validarStatus(diaria: Diaria) {
    if (diaria.status !== DiariaStatus.SEM_PAGAMENTO) {
      throw new BadRequestException(
        'Diária deve estar com o status Sem Pagamento',
      );
    }
    return diaria;
  }

  async validarClienteDiaria(usuario: UsuarioApi, diaria: Diaria) {
    if (usuario.id !== diaria.cliente.id) {
      throw new ForbiddenException('Acesso negado');
    }
  }
}
