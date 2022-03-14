import { EntityRepository, Repository } from 'typeorm';
import { UsuarioApi } from './entities/usuario.entity';

@EntityRepository(UsuarioApi)
export class UsuarioRepository extends Repository<UsuarioApi> {
  async getUsers(): Promise<UsuarioApi[]> {
    const query = this.createQueryBuilder('usuarioApi');
    const usuarios = await query.getMany();
    return usuarios;
  }
}
