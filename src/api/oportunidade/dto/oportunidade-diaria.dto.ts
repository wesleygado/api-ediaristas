import { Exclude } from 'class-transformer';
import { HateoasLinks } from 'src/core/hateoas/hateoas.interface';
import { DiariaResponseDto } from 'src/api/diarias/dto/diaria-response.dto';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';

export class OportunidadeDiariaDtoResponse extends DiariaResponseDto {
  links?: HateoasLinks[];
}
