import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCandidaturaDto } from 'src/api/candidaturas/dto/create-candidatura.dto';
import { HateoasOportunidade } from 'src/core/hateoas/hateoas-oportunidade';
import { DiariaMapper } from 'src/api/diarias/diaria.mapper';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { DiariaResponseDto } from 'src/api/diarias/dto/diaria-response.dto';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { OportunidadeDiariaDtoResponse } from './dto/oportunidade-diaria.dto';

@Injectable()
export class OportunidadeService {
  constructor(
    @InjectRepository(DiariaRepository)
    private diariaRepository: DiariaRepository,
    private hateoas: HateoasOportunidade,
    private diariaMapper: DiariaMapper,
  ) {}
  async buscarOportunidades(usuarioLogado: UsuarioApi) {
    const cidades = usuarioLogado.cidadesAtendidas.map(
      (cidade) => cidade.codigoIbge,
    );
    let diaria = await this.diariaRepository.findOportunidades(
      cidades,
      usuarioLogado,
    );

    /*Solução temporária - Mas tá funcionando!*/
    diaria = diaria.filter((diaria) => diaria.candidatos.length < 3);
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
      diariaResponseDto[i].links = this.hateoas.gerarLinksHateoas(diaria[i]);
    }
    /**/
    return diariaResponseDto;
  }
}
