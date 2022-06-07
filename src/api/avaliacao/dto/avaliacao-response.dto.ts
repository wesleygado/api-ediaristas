import { PartialType } from '@nestjs/mapped-types';
import { Foto } from 'src/api/fotos/entities/foto.entity';
import { AvaliacaoRequestDto } from './avaliacao-request.dto';

export class AvaliacaoResponseDto extends PartialType(AvaliacaoRequestDto) {
  nomeAvaliador: string;
  fotoAvaliador: string;
}
