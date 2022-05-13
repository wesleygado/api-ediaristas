import { Exclude } from 'class-transformer';
import { HateoasLinks } from 'src/core/hateoas/hateoas.interface';
import { DiariaResponseDto } from 'src/diarias/dto/diaria-response.dto';
import { Diaria } from 'src/diarias/entities/diaria.entity';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';

export class OportunidadeDiariaDtoResponse extends DiariaResponseDto {
  links?: HateoasLinks[];
}
