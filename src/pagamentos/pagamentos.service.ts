import { BadGatewayException, Injectable } from '@nestjs/common';
import { DiariaRepository } from 'src/diarias/diaria.repository';
import DiariaStatus from 'src/diarias/enum/diaria-status';
import { PagamentoRequestDto } from './dto/paramento-request.dto';
import { PagamentoResponseDto } from './dto/pagamento-response.dto';
import { ValidatorPagamentoStatus } from 'src/core/validators/pagamento/validator-pagamento';

@Injectable()
export class PagamentosService {
  constructor(
    private diariaRepository: DiariaRepository,
    private pagamentoValidator: ValidatorPagamentoStatus,
  ) {}
  async pagar(pagamentoDto: PagamentoRequestDto, id: number) {
    const diaria = await this.buscarDiariaPorId(id);
    await this.pagamentoValidator.validarStatus(diaria);
    diaria.status = DiariaStatus.PAGO;
    this.diariaRepository.save(diaria);
    return new PagamentoResponseDto('Diária paga com sucesso');
  }

  private async buscarDiariaPorId(id: number) {
    const diaria = await this.diariaRepository.findOne({ id: id });

    if (!diaria) {
      throw new BadGatewayException('Diária não encontrada');
    }

    return diaria;
  }
}
