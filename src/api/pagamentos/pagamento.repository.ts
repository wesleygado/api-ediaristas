import { EntityRepository, Repository } from 'typeorm';
import { Diaria } from '../diarias/entities/diaria.entity';
import { Pagamento } from './entities/pagamento.entity';
import { PagamentoStatus } from './enum/pagamento-status';

@EntityRepository(Pagamento)
export class PagamentoRepository extends Repository<Pagamento> {
  async findPagamentosParaReembolso(diaria: Diaria): Promise<Pagamento> {
    const pagamento = await this.createQueryBuilder('pagamento')
      .select('pagamento')
      .where('pagamento.diaria_id = :id', { id: diaria.id })
      .andWhere('pagamento.status = :status', {
        status: PagamentoStatus.ACEITO,
      })
      .getOne();

    return pagamento;
  }
}
