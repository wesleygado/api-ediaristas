import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'express';
import { ValidatorCandidatura } from 'src/core/validators/candidatura/validator-candidatura';
import { DiariaRepository } from 'src/diarias/diaria.repository';
import { Diaria } from 'src/diarias/entities/diaria.entity';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class CandidaturaService {
  constructor(
    @InjectRepository(DiariaRepository)
    private readonly diariaRepository: DiariaRepository,
    private readonly validatorCandidatura: ValidatorCandidatura,
  ) {}
  async candidatar(id: number, usuarioLogado: UsuarioApi) {
    const diaria = await this.buscarDiariaPorId(id);

    await this.validatorCandidatura.validar(usuarioLogado, diaria);

    if (!diaria.candidatos) {
      diaria.candidatos = [];
    }

    diaria.candidatos.push(usuarioLogado);
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
