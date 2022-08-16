import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { JwtPayload } from './strategies/jwt-payload.interface';
import { JwtTokens } from './strategies/jwt-tokens';
import { ITokens } from './strategies/jwt-tokens.interface';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { UsuarioAuthDto } from './dtos/usuario-auth.dto';
import { TokenDto } from 'src/auth/tokens/dtos/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private jwtTokens: JwtTokens,
  ) {}

  async signIn(usuarioAuthDto: UsuarioAuthDto): Promise<ITokens> {
    const { email, password } = usuarioAuthDto;
    const usuario = await this.usuarioRepository.repository.findOneBy({
      email: email,
    });

    if (usuario && (await bcrypt.compare(password, usuario.senha))) {
      const payload: JwtPayload = { email };
      return await this.jwtTokens.gerarTokens(payload);
    } else {
      throw new UnauthorizedException('Usuário ou Senha inválidos');
    }
  }

  async reautenticar(req: Request) {
    const email = await this.jwtTokens.verificarRefrestToken(req);
    const payload: JwtPayload = { email };
    return this.jwtTokens.gerarTokens(payload);
  }

  async logout(tokenDto: TokenDto) {
    return this.jwtTokens.desativarToken(tokenDto);
  }
}
