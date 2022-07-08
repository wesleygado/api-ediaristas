import DiariaStatus from '../diarias/enum/diaria-status';
import { PagamentoResponseDto } from './dto/pagamento-response.dto';
import { Pagamento } from './entities/pagamento.entity';

export class PagamentoMapper {
  toResponse(pagamento: Pagamento): PagamentoResponseDto {
    const pagamentoResponse = new PagamentoResponseDto();
    pagamentoResponse.id = pagamento.id;
    pagamentoResponse.status = this.pagamentoStatus(pagamento);
    pagamentoResponse.valor = pagamento.valor;
    pagamentoResponse.valorDeposito = this.calculoValorDeposito(pagamento);
    pagamentoResponse.createdAt = pagamento.created_at;

    return pagamentoResponse;
  }
  private pagamentoStatus(pagamento: Pagamento): number {
    return DiariaStatus.TRANSFERIDO === pagamento.diaria.status ? 1 : 2;
  }

  private calculoValorDeposito(pagamento: Pagamento): number {
    return pagamento.diaria.preco - pagamento.diaria.valorComissao;
  }
}
