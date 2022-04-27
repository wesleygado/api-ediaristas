import { ITokens } from 'src/auth/strategies/jwt-tokens.interface';
import { HateoasLinks } from 'src/core/hateoas/hateoas.interface';
import { UsuarioResponseDto } from './usuario-response.dto';

export class UsuarioCadastroResponseDto extends UsuarioResponseDto {
  tokens: ITokens;
}
