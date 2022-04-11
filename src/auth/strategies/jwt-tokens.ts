import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';

import { JwtPayload } from './jwt-payload.interface';
import { ITokens } from './jwt-tokens.interface';

@Injectable()
export class JwtTokens {
  constructor(
    private jwtService: JwtService,
    private usuarioRepository: UsuarioRepository,
  ) {}
  async gerarTokens(payload: JwtPayload): Promise<ITokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: 'topSecret512',
        expiresIn: 30,
      }),
      this.jwtService.signAsync(payload, {
        secret: 'topSecret51-rt',
        expiresIn: 60,
      }),
    ]);
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async verificarRefrestToken(req) {
    const accessToken = req.headers['authorization']
      .replace('Bearer', '')
      .trim();

    const email = this.jwtService.decode(accessToken)['email'];
    const usuario = await this.usuarioRepository.findOne({
      email: email,
    });

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      this.jwtService.verify(accessToken, {
        secret: 'topSecret51-rt',
      });
      return email;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }
}
