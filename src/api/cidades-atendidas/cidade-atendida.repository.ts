import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CidadesAtendidas } from './entities/cidades-atendidas.entity';

export class CidadesAtendidasRepository {
  constructor(
    @InjectRepository(CidadesAtendidas)
    private cidadesAtendidasRepository: Repository<CidadesAtendidas>,
  ) {}

  repository = this.cidadesAtendidasRepository.extend({
    async findByCodigoIbge(condigoIbge: string): Promise<CidadesAtendidas> {
      return this.findOneBy({ codigoIbge: condigoIbge });
    },
  });
}
