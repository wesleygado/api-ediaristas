import { InjectRepository } from '@nestjs/typeorm';
import { EntityRepository, Repository } from 'typeorm';
import { Servico } from './entities/services.entity';

export class ServicoRepository {
  constructor(
    @InjectRepository(Servico)
    private servicoRepository: Repository<Servico>,
  ) {}
  repository = this.servicoRepository.extend({
    async getServicos(): Promise<Servico[]> {
      const query = this.createQueryBuilder('servico');
      const servicos = await query.getMany();
      return servicos;
    },
  });
}
