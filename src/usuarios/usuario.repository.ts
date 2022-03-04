import { EntityRepository, Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario> {
  async getUsers(): Promise<Usuario[]> {
    const query = this.createQueryBuilder('usuario');
    const usuarios = await query.getMany();
    return usuarios;
  }

  async createUser(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { nomeCompleto, email, senha, tipoUsuario } = createUsuarioDto;
    const usuario = this.create({
      nomeCompleto,
      email,
      senha,
      tipoUsuario,
    });

    await this.save(usuario);
    return usuario;
  }
}
