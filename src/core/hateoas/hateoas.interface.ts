import { UsuarioResponseDto } from 'src/api/usuarios/dtos/usuario-response.dto';

export interface HateoasInterface {
  gerarLinksHateoas(): HateoasLinks[];
}

export interface HateoasLinks {
  type: string;
  rel: string;
  uri: string;
}