import { EntityRepository, Repository } from 'typeorm';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioApi } from './entities/usuario.entity';

@EntityRepository(UsuarioApi)
export class UsuarioRepository extends Repository<UsuarioApi> {
  async getUsers(): Promise<UsuarioApi[]> {
    const query = this.createQueryBuilder('usuarioApi');
    const usuarios = await query.getMany();
    return usuarios;
  }

  async createUser(usuarioRequestDto: UsuarioRequestDto): Promise<UsuarioApi> {
    const {
      nomeCompleto,
      email,
      password,
      tipoUsuario,
      cpf,
      nascimento,
      telefone,
      chavePix,
    } = usuarioRequestDto;
    const usuario = this.create({
      nomeCompleto,
      email,
      senha: password,
      tipoUsuario,
      cpf,
      nascimento,
      telefone,
      chavePix,
    });
    await this.save(usuario);
    return usuario;
  }
}
