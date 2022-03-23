import { EntityRepository, Repository } from 'typeorm';

import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { UsuarioApi } from './entities/usuario.entity';

@EntityRepository(UsuarioApi)
export class UsuarioRepository extends Repository<UsuarioApi> {
  async getUsers(): Promise<UsuarioApi[]> {
    const query = this.createQueryBuilder('usuarioApi');
    const usuarios = await query.getMany();
    return usuarios;
  }

  async createUser(
    usuarioResponseDto: UsuarioResponseDto,
  ): Promise<UsuarioApi> {
    const {
      nomeCompleto,
      email,
      senha,
      tipoUsuario,
      cpf,
      nascimento,
      telefone,
      chavePix,
    } = usuarioResponseDto;
    const usuario = this.create({
      nomeCompleto,
      email,
      senha,
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
