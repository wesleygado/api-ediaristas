import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';
import * as bcrypt from 'bcrypt';
import { UsuarioAuthDto } from './dtos/usuario-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(
    usuarioAuthDto: UsuarioAuthDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = usuarioAuthDto;
    const usuario = await this.usuarioRepository.findOne({ email: email });

    if (usuario && (await bcrypt.compare(password, usuario.senha))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Cheque suas credenciais');
    }
  }
}
