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
      fotoUsuario,
      reputacao,
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
      fotoUsuario,
      reputacao,
    });
    await this.save(usuario);
    return usuario;
  }

  async getMediaReputacaoDiarista(tipoUsuario): Promise<number> {
    if (tipoUsuario == 1) {
      tipoUsuario = 'Cliente';
    }

    if (tipoUsuario == 2) {
      tipoUsuario = 'Diarista';
    }

    const media = await this.createQueryBuilder('usuario')
      .select('AVG(usuario.reputacao)', 'avg')
      .where('usuario.tipo_usuario = :tipo_usuario', {
        tipo_usuario: tipoUsuario,
      })
      .getRawOne();
    console.log(tipoUsuario);
    return media.avg;
  }
}
