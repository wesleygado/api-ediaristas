import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { EnderecoDiaristaRequestDto } from './dto/endereco-diarista-request.dto';
import { EnderecoDiaristaMapper } from './endereco-diarista.mapper';
import { EnderecoDiaristaRepository } from './endereco-diarista.repository';

@Injectable()
export class EnderecoDiaristaService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private enderecoRepository: EnderecoDiaristaRepository,
    private enderecoDiaristaMapper: EnderecoDiaristaMapper,
  ) {}
  async alterarEndereco(
    enderecoDiarista: EnderecoDiaristaRequestDto,
    usuario: UsuarioApi,
  ) {
    if (!usuario.endereco) {
      usuario.endereco = await this.enderecoRepository.repository.save(
        enderecoDiarista,
      );
      const usuarioAtualizado = await this.usuarioRepository.repository.save(
        usuario,
      );
      return this.enderecoDiaristaMapper.toEnderecoDiaristaResponse(
        usuarioAtualizado.endereco,
      );
    }
    enderecoDiarista.id = usuario.endereco.id;
    usuario.endereco = await this.enderecoRepository.repository.save(
      enderecoDiarista,
    );
    const usuarioAtualizado = await this.usuarioRepository.repository.save(
      usuario,
    );
    return this.enderecoDiaristaMapper.toEnderecoDiaristaResponse(
      usuarioAtualizado.endereco,
    );
  }
  async exibirEndereco(usuario: UsuarioApi) {
    if (!usuario.endereco) {
      throw new NotFoundException(
        `Endereço do usuário: ${usuario.email} nâo encontrado`,
      );
    }
    return this.enderecoDiaristaMapper.toEnderecoDiaristaResponse(
      usuario.endereco,
    );
  }
}
