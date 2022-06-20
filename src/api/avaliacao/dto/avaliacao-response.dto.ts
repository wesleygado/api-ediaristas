import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { AvaliacaoRequestDto } from './avaliacao-request.dto';

export class AvaliacaoResponseDto extends PartialType(AvaliacaoRequestDto) {
  @Expose({ name: 'nome_avaliador' })
  nomeAvaliador: string;

  @Expose({ name: 'foto_avaliador' })
  fotoAvaliador: string;
}
