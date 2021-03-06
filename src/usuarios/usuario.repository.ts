import { EntityRepository, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {
  async getUsers(): Promise<Usuario[]> {
    const query = this.createQueryBuilder('usuario');
    const usuarios = await query.getMany();
    return usuarios;
  }
}
