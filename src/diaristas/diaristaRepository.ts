import { EntityRepository, Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';

@EntityRepository(Usuario)
export class DiaristaRepository extends Repository<Usuario> {
  async getUsers(): Promise<Usuario[]> {
    const query = this.createQueryBuilder('usuario');
    const usuarios = await query.getMany();
    return usuarios;
  }
}
