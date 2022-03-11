import { EntityRepository, Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';

@EntityRepository(Usuario)
export class DiaristaRepository extends Repository<Usuario> {
  async buscarDiaristasPorCep(): Promise<Usuario[]> {
    const query = this.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.fotoUsuario', 'foto')
      .leftJoinAndSelect('usuario.cidadesAtendidas', 'cidadesAtendidas');
    const usuarios = await query.getMany();
    return usuarios;
  }

  async findByCidadesAtendidasCodigoIbge(
    codigoIbge: string,
    pageSize: number,
  ): Promise<PagedQuery<Usuario>> {
    const query = this.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.fotoUsuario', 'foto')
      .leftJoinAndSelect('usuario.cidadesAtendidas', 'cidadesAtendidas')
      .where('cidadesAtendidas.codigoIbge = :ibge', { ibge: codigoIbge })
      .orderBy('usuario.reputacao', 'DESC');
    const usuarios = await query.limit(pageSize).getMany();
    const count = await query.getCount();

    return { content: usuarios, totalElement: count };
  }
}

export interface PagedQuery<T> {
  content: T[];
  totalElement: number;
}
