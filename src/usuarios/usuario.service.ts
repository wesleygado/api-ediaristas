import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRequestDto } from './dtos/usuario-request.dto';
import { UsuarioResponseDto } from './dtos/usuario-response.dto';
import { UsuarioMapper } from './usuario.mapper';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
    private mapper: UsuarioMapper,
  ) {}

  buscarDiaristasPorCep() {
    return this.usuarioRepository.getUsers();
  }

  async cadastrar(request: UsuarioRequestDto): Promise<UsuarioResponseDto> {
    const usuarioParaCadastrar = this.mapper.toUsuarioRequestDto(request);
    const usuarioCadastrado = await this.usuarioRepository.createUser(
      usuarioParaCadastrar,
    );

    return this.mapper.toUsuarioResponseDto(usuarioCadastrado);
  }
}
