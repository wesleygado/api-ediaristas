import { Injectable } from '@nestjs/common';
import { ViaCepService } from 'src/core/services/via-cep.service';
import { DiaristaMapper } from './diarista.mapper';
import { DiaristaRepository } from './diarista.repository';
import { DiaristaLocalidadesPagedResponse } from './dtos/diarista-localidades-paged-response.dto';
import { DisponibilidadeResponse } from './dtos/disponibilidade-response.dto';

@Injectable()
export class DiaristaService {
  constructor(
    private diaristaRepository: DiaristaRepository,
    private viaCepService: ViaCepService,
    private diaristaMapper: DiaristaMapper,
  ) {}

  async buscarDiaristasPorCep(cep: string) {
    const codigoIbge = await this.buscarCodigoIbgePorCep(cep);

    const pageSize = 6;
    const usuarios =
      await this.diaristaRepository.repository.findByCidadesAtendidasCodigoIbge(
        codigoIbge,
        pageSize,
      );

    const diaristas = usuarios.content.map((usuario) =>
      this.diaristaMapper.toDiaristaLocalidadeResponseDto(usuario),
    );

    return new DiaristaLocalidadesPagedResponse(
      diaristas,
      pageSize,
      usuarios.totalElement,
    );
  }

  async verificarDisponibilidadePorCep(cep: string) {
    const codigoIbge = await this.buscarCodigoIbgePorCep(cep);
    const disponibilidade =
      await this.diaristaRepository.repository.existsByCidadesAtendidasCodigoIbge(
        codigoIbge,
      );
    return new DisponibilidadeResponse(disponibilidade);
  }

  private async buscarCodigoIbgePorCep(cep: string) {
    return (await this.viaCepService.buscarEnderecoPorCep(cep)).ibge;
  }
}
