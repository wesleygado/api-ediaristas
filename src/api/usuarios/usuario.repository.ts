import { EntityRepository, Repository } from 'typeorm';

import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioApi } from './entities/usuario.entity';

@EntityRepository(UsuarioApi)
export class UsuarioRepository extends Repository<UsuarioApi> {
  async getUsers(): Promise<UsuarioApi[]> {
    const query = this.createQueryBuilder('usuarioApi');
    return await query.getMany();
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
      fotoDocumento,
      fotoUsuario,
      reputacao,
      endereco,
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
      fotoDocumento,
      fotoUsuario,
      reputacao,
      endereco,
    });
    await this.save(usuario);
    return usuario;
  }

  async getMediaReputacaoDiarista(tipoUsuario): Promise<number> {
    const { avg } = await this.createQueryBuilder('usuario')
      .select('AVG(usuario.reputacao)', 'avg')
      .where('usuario.tipo_usuario = :tipo_usuario', {
        tipo_usuario: tipoUsuario,
      })
      .getRawOne();
    return avg;
  }
}