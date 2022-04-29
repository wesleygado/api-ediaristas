import { BadRequestException, Injectable } from '@nestjs/common';
import { Diaria } from 'src/diarias/entities/diaria.entity';
import DiariaStatus from 'src/diarias/enum/diaria-status';

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
}
