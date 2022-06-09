import { EntityRepository, Repository } from 'typeorm';
import { Diaria } from '../diarias/entities/diaria.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { Avaliacao } from './entities/avaliacao.entity';

@EntityRepository(Avaliacao)
export class AvaliacaoRepository extends Repository<Avaliacao> {
  async getAvaliacaoMedia(usuario: UsuarioApi): Promise<number> {
    const { avg } = await this.createQueryBuilder('avaliacao')
      .leftJoinAndSelect('avaliacao.avaliado', 'avaliado')
      .where('avaliacao.avaliado_id = :id', { id: usuario.id })
      .select('AVG(avaliacao.nota)', 'avg')
      .getRawOne();
    console.log(avg);
    return avg;
  }

  async isClienteAndDiaristaAvaliaramDiaria(diaria: Diaria): Promise<boolean> {
    const numeroDeAvaliacoes = await this.createQueryBuilder('avaliacao')
      .where('avaliacao.diaria = :id', { id: diaria.id })
      .getCount();
    console.log(numeroDeAvaliacoes);
    return numeroDeAvaliacoes >= 2 ? true : false;
  }
}
