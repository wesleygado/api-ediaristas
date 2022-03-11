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
    const codigoIbge = (await this.viaCepService.buscarEnderecoPorCep(cep))
      .ibge;

    const pageSize = 6;
    const usuarios =
      await this.diaristaRepository.findByCidadesAtendidasCodigoIbge(
        codigoIbge,
        pageSize,
      );

    const diaristas = usuarios.content.map((usuario) =>
      this.diaristaMapper.toDiaristaLocalidadeResponseDto(usuario),
    );

    return new diaristaLocalidadesPagedResponse(
      diaristas,
      pageSize,
      usuarios.totalElement,
    );
  }
}
