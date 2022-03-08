import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiaristaRepository } from './diaristaRepository';
import type { Mapper } from '@automapper/types';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { DiaristaLocalidadeResponseDto } from './dto/diaristaLocalidadeResponse.dto';

@Injectable()
export class DiaristaService {
  constructor(
    @InjectRepository(DiaristaRepository)
    private diaristaRepository: DiaristaRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async buscarDiaristasPorCep() {
    return await this.diaristaRepository.getUsers();
  }

  async findOne(id: number) {
    this.mapper.createMap(Usuario, DiaristaLocalidadeResponseDto);
    const usuario = await this.diaristaRepository.findOne(id);
    const diaristaLocalidades = this.mapper.map(
      usuario,
      DiaristaLocalidadeResponseDto,
      Usuario,
    );
    console.log(usuario);
    console.log(diaristaLocalidades);
    return diaristaLocalidades;
  }
}
