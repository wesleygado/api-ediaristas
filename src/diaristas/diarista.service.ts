import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ViaCepService } from 'src/consulta-endereco/providers/viaCep.service';
import { DiaristaMapper } from './diarista.mapper';
import { DiaristaRepository } from './diarista.repository';

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

    return this.diaristaMapper.toDiaristaLocalidadeResponseDto(usuarios);
  }
}
