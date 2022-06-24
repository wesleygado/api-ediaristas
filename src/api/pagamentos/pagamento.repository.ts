import { EntityRepository, Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';

@EntityRepository(Pagamento)
export class PagamentoRepository extends Repository<Pagamento> {}
