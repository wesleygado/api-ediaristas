import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'express';
import { DiariaRepository } from 'src/diarias/diaria.repository';
import { Diaria } from 'src/diarias/entities/diaria.entity';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class CandidaturaService {
  constructor(
    @InjectRepository(DiariaRepository)
    private readonly diariaRepository: DiariaRepository,
  ) {}
  async candidatar(id: number, usuarioLogado: UsuarioApi) {
    const diaria = await this.buscarDiariaPorId(id);
    if (!diaria.candidatos) {
      diaria.candidatos = [];
    }
    diaria.candidatos.push(usuarioLogado);
    console.log(diaria.candidatos);
    this.diariaRepository.save(diaria);
    return 'Candidatura realizada com sucesso';
  }

  async buscarDiariaPorId(id: number): Promise<Diaria> {
    const diaria = await this.diariaRepository.findOne(id);
    if (!diaria) {
      throw new NotFoundException(`Diária de id:${id} não encontrada`);
    }
    return diaria;
  }
}
