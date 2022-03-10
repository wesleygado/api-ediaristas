import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ViaCepService } from 'src/consulta-endereco/providers/viaCep.service';
import { DiaristaMapper } from './diarista.mapper';
import { DiaristaRepository } from './diarista.repository';
import { diaristaLocalidadesPagedResponse } from './dtos/diaristaLocalidadesPagedResponse.dto';

@Injectable()
export class DiaristaService {
  constructor(
    @InjectRepository(DiaristaRepository)
    private diaristaRepository: DiaristaRepository,
    private viaCepService: ViaCepService,
    private diaristaMapper: DiaristaMapper,
  ) {}

  async buscarDiaristasPorCep(cep: string) {
    const codigoIbge = JSON.parse(
      (await this.viaCepService.buscarEnderecoPorCep(cep)).ibge,
    );

    const usuarios =
      await this.diaristaRepository.findByCidadesAtendidasCodigoIbge(
        codigoIbge,
      );

    const diaristas =
      this.diaristaMapper.toDiaristaLocalidadeResponseDto(usuarios);

    return new diaristaLocalidadesPagedResponse(
      diaristas.slice(0, 6),
      6,
      usuarios.length,
    );
  }
}
