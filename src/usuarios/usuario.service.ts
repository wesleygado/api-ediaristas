import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiaristaLocalidadeResponseDto } from '../diaristas/dto/diaristaLocalidadeResponse.dto';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
  ) {}

  buscarDiaristasPorCep() {
    return this.usuarioRepository.getUsers();
  }
}
