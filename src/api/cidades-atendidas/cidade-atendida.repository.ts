import { EntityRepository, Repository } from 'typeorm';
import { CidadesAtendidas } from './entities/cidades-atendidas.entity';

@EntityRepository(CidadesAtendidas)
export class CidadesAtendidasRepository extends Repository<CidadesAtendidas> {
  async findByCodigoIbge(condigoIbge: string): Promise<CidadesAtendidas> {
    return this.findOne({ codigoIbge: condigoIbge });
  }
}
