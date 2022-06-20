import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HateoasOportunidade } from 'src/core/hateoas/hateoas-oportunidade';
import { DiariaMapper } from 'src/api/diarias/diaria.mapper';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { AvaliacaoMapper } from '../avaliacao/avaliacao.mapper';
import { AvaliacaoRepository } from '../avaliacao/avaliacao.repository';

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
    let diaria = await this.diariaRepository.findOportunidades(cidades);

    /*Solução temporária - Mas tá funcionando!*/
    diaria = diaria.filter((diaria) => diaria.candidatos.length <= 3);
    for (let i = 0; i < diaria.length; i++) {
      for (let j = 0; j < diaria[i].candidatos.length; j++) {
        if (diaria[i].candidatos[j].id === usuarioLogado.id) {
          diaria.splice(i, 1);
        }
      }
    }
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
