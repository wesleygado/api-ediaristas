import { EntityRepository, Repository } from 'typeorm';
import { Avaliacao } from './entities/avaliacao.entity';

@EntityRepository(Avaliacao)
export class AvaliacaoRepository extends Repository<Avaliacao> {
  async createAvaliacao(): Promise<void> {
    //
  }
}
