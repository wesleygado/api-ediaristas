import { Injectable, NotFoundException } from '@nestjs/common';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import { PagamentoRequestDto } from './dto/paramento-request.dto';
import { PagamentoResponseDto } from './dto/pagamento-response.dto';
import { ValidatorPagamentoStatus } from 'src/core/validators/pagamento/validator-pagamento';
import { PagarMeService } from 'src/core/services/getaway-pagamento/providers/pagarme.service';
import { PagamentoStatus } from './enum/pagamento-status';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { GatewayPagamentoService } from 'src/core/services/getaway-pagamento/adapters/gateway-pagamento.service';

@Injectable()
export class PagamentosService {
  constructor(
    private diariaRepository: DiariaRepository,
    private pagamentoValidator: ValidatorPagamentoStatus,
    private gateway: GatewayPagamentoService,
  ) {}

  async pagar(
    pagamentoDto: PagamentoRequestDto,
    id: number,
    usuarioLogado: UsuarioApi,
  ) {
    const diaria = await this.buscarDiariaPorId(id);
    await this.pagamentoValidator.validarClienteDiaria(usuarioLogado, diaria);
    await this.pagamentoValidator.validarStatus(diaria);

    const pagamento = await this.gateway.pagar(diaria, pagamentoDto.cardHash);

    if (pagamento.status === PagamentoStatus.ACEITO) {
      diaria.status = DiariaStatus.PAGO;
      this.diariaRepository.save(diaria);
      return new PagamentoResponseDto('Diária paga com sucesso');
    }

    return new PagamentoResponseDto('Pagamento Recusado');
  }

  private async buscarDiariaPorId(id: number) {
    const diaria = await this.diariaRepository.findOne({ id: id });

    if (!diaria) {
      throw new NotFoundException('Diária não encontrada');
    }

    return diaria;
  }
}
