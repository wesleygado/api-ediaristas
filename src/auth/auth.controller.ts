import { Body, Controller, Post, Request } from '@nestjs/common';
import { TokenDto } from 'src/tokens/dtos/token.dto';
import { AuthService } from './auth.service';
import { UsuarioAuthDto } from './dtos/usuario-auth.dto';
import { ITokens } from './strategies/jwt-tokens.interface';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/token')
  autenticar(@Body() usuarioAuthDto: UsuarioAuthDto): Promise<ITokens> {
    console.log('esta autenticando');
    return this.authService.signIn(usuarioAuthDto);
  }

  @Post('/refresh')
  reautenticar(@Request() req) {
    console.log('esta atualizando');
    return this.authService.reautenticar(req);
  }

  @Post('/logout')
  logOut(@Body() tokenDto: TokenDto) {
    console.log('esta logout');
    return this.authService.logout(tokenDto);
  }
}
