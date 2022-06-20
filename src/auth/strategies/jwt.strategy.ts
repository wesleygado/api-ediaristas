import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { UsuarioMapper } from 'src/api/usuarios/usuario.mapper';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(UsuarioRepository)
    private usuarioRepository: UsuarioRepository,
    private mapper: UsuarioMapper,
  ) {
    super({
      secretOrKey: 'topSecret512',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }
  async validate(payload: JwtPayload): Promise<UsuarioApi> {
    const { email } = payload;
    const usuario = await this.usuarioRepository.findOne({
      email: email,
    });

    if (!usuario) {
      throw new UnauthorizedException();
    }

    return usuario;
  }
}
