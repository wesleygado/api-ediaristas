import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsuarioAuthDto } from './dtos/usuario-auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/token')
  signIn(
    @Body() usuarioAuthDto: UsuarioAuthDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(usuarioAuthDto);
  }

  @Get('/test')
  @UseGuards(AuthGuard('jwt'))
  teste(@Req() req) {
    console.log(req);
  }
}
