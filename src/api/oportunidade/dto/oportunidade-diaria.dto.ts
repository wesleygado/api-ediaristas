import { HateoasLinks } from 'src/core/hateoas/hateoas.interface';
import { DiariaResponseDto } from 'src/api/diarias/dto/diaria-response.dto';
import { Avaliacao } from 'src/api/avaliacao/entities/avaliacao.entity';

export class OportunidadeDiariaDtoResponse extends DiariaResponseDto {
  links?: HateoasLinks[];
  avalicoes: Avaliacao[];
}
