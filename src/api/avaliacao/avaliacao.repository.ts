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
    return avg;
  }

  async isClienteAndDiaristaAvaliaramDiaria(diaria: Diaria): Promise<boolean> {
    const numeroDeAvaliacoes = await this.createQueryBuilder('avaliacao')
      .where('avaliacao.diaria = :id', { id: diaria.id })
      .getCount();
    return numeroDeAvaliacoes >= 2 ? true : false;
  }

  async findByAvaliado(avaliado: UsuarioApi): Promise<Avaliacao[]> {
    const avaliacoes = await this.createQueryBuilder('avaliacao')
      .leftJoinAndSelect('avaliacao.avaliado', 'avaliado')
      .leftJoinAndSelect('avaliacao.avaliador', 'avaliador')
      .where('avaliacao.avaliado_id = :id', { id: avaliado.id })
      .limit(2)
      .getMany();

    avaliacoes.sort((a, b) => b.created_at.valueOf() - a.created_at.valueOf());
    return avaliacoes;
  }

  async findByAvaliadorAndDiaria(
    avaliador: UsuarioApi,
    diaria: Diaria,
  ): Promise<boolean> {
    const avaliacoes = await this.createQueryBuilder('avaliacao')
      .leftJoinAndSelect('avaliacao.avaliador', 'avaliador')
      .leftJoinAndSelect('avaliacao.diaria', 'diaria')
      .where(
        'avaliacao.avaliador_id = :avaliadorId AND avaliacao.diaria_id = :diariaId',
        {
          avaliadorId: avaliador.id,
          diariaId: diaria.id,
        },
      )
      .limit(2)
      .getMany();

    return avaliacoes.length > 0 ? true : false;
  }
}
