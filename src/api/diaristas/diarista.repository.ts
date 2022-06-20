import { EntityRepository, Repository } from 'typeorm';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';

@EntityRepository(UsuarioApi)
export class DiaristaRepository extends Repository<UsuarioApi> {
  async buscarDiaristasPorCep(): Promise<UsuarioApi[]> {
    const query = this.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.fotoUsuario', 'foto')
      .leftJoinAndSelect('usuario.cidadesAtendidas', 'cidadesAtendidas');
    const usuarios = await query.getMany();
    return usuarios;
  }

  async findByCidadesAtendidasCodigoIbge(
    codigoIbge: string,
    pageSize: number,
  ): Promise<PagedQuery<UsuarioApi>> {
    const query = this.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.fotoUsuario', 'foto')
      .leftJoinAndSelect('usuario.cidadesAtendidas', 'cidadesAtendidas')
      .where('cidadesAtendidas.codigoIbge = :ibge', { ibge: codigoIbge })
      .andWhere('usuario.tipoUsuario = 2')
      .orderBy('usuario.reputacao', 'DESC');
    const usuarios = await query.limit(pageSize).getMany();
    const count = await query.getCount();

    console.log(usuarios[1]);
    return { content: usuarios, totalElement: count };
  }

  async existsByCidadesAtendidasCodigoIbge(
    codigoIbge: string,
  ): Promise<boolean> {
    const exists = await this.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.cidadesAtendidas', 'cidadesAtendidas')
      .where('cidadesAtendidas.codigoIbge = :ibge', { ibge: codigoIbge })
      .limit(1)
      .getCount();
    return exists > 0 ? true : false;
  }
}

export interface PagedQuery<T> {
  content: T[];
  totalElement: number;
}
