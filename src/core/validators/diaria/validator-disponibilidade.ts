import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { DiariaRequestDto } from 'src/diarias/dto/diaria-request.dto';
import { DiaristaRepository } from 'src/diaristas/diarista.repository';

@Injectable()
export class ValidatorDisponibilidade {
  constructor(private diaristaRepository: DiaristaRepository) {}
  async validarDisponibilidade(diariaDTO: DiariaRequestDto) {
    const codigoIbge = diariaDTO.codigoIbge;
    const disponibilidade =
      await this.diaristaRepository.existsByCidadesAtendidasCodigoIbge(
        codigoIbge,
      );
    if (disponibilidade === false) {
      throw new BadRequestException(
        'Não há diaristas disponíveis para este CEP',
      );
    }

    return codigoIbge;
  }
}
