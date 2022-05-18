import { EntityRepository, Repository } from 'typeorm';
import { Servico } from './entities/services.entity';

@EntityRepository(Servico)
export class ServicoRepository extends Repository<Servico> {
  async getServicos(): Promise<Servico[]> {
    const query = this.createQueryBuilder('servico');
    const servicos = await query.getMany();
    return servicos;
  }
}
