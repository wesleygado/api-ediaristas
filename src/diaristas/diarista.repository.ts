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
  ): Promise<Usuario[]> {
    const query = this.createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.fotoUsuario', 'foto')
      .leftJoinAndSelect('usuario.cidadesAtendidas', 'cidadesAtendidas')
      .where('cidadesAtendidas.codigoIbge = :ibge', { ibge: codigoIbge });
    const usuarios = await query.getMany();
    return usuarios;
  }
}
