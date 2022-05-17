import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { DiariaRequestDto } from 'src/api/diarias/dto/diaria-request.dto';

@Injectable()
export class ValidatorHoraAtendimento {
  validarHoraAtendimento(
    diariaDTO: DiariaRequestDto,
    horaLimiteAtendimento: number,
  ) {
    const horaAtendimento = new Date(diariaDTO.dataAtendimento).getHours();
    const tempoAtendimento = diariaDTO.tempoAtendimento;

    if (horaAtendimento + tempoAtendimento > horaLimiteAtendimento) {
      throw new BadRequestException(
        'Horário de atendimento máximo até as 20:00',
      );
    }
  }
}
