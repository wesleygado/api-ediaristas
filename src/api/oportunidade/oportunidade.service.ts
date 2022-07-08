/* eslint-disable no-var */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HateoasOportunidade } from 'src/core/hateoas/hateoas-oportunidade';
import { DiariaMapper } from 'src/api/diarias/diaria.mapper';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { AvaliacaoMapper } from '../avaliacao/avaliacao.mapper';
import { AvaliacaoRepository } from '../avaliacao/avaliacao.repository';
import { CandidaturaController } from '../candidaturas/candidatura.controller';

@Injectable()
export class OportunidadeService {
  constructor(
    @InjectRepository(DiariaRepository)
    private diariaRepository: DiariaRepository,
    private hateoas: HateoasOportunidade,
    private diariaMapper: DiariaMapper,
    private avaliacaoMapper: AvaliacaoMapper,
    @InjectRepository(AvaliacaoRepository)
    private readonly avaliacaoRepository: AvaliacaoRepository,
  ) {}
  async buscarOportunidades(usuarioLogado: UsuarioApi) {
    const cidades = usuarioLogado.cidadesAtendidas.map(
      (cidade) => cidade.codigoIbge,
    );
    const diaria = await this.diariaRepository.findOportunidades(
      cidades,
      usuarioLogado.id,
    );

    const diariaResponseDto = [];
    for (let i = 0; i < diaria.length; i++) {
      diariaResponseDto[i] = await this.diariaMapper.toDiariaResponseDto(
        diaria[i],
      );
      const avaliacoes = await this.avaliacaoRepository.findByAvaliado(
        diaria[i].cliente,
      );
      diariaResponseDto[i].avaliacao = avaliacoes.map((avaliacao) =>
        this.avaliacaoMapper.toResponse(avaliacao),
      );
      diariaResponseDto[i].links = this.hateoas.gerarLinksHateoas(diaria[i]);
    }
    /**/
    return diariaResponseDto;
  }
}
