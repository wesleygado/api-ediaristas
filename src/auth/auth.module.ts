import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtTokens } from './strategies/jwt-tokens';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UsuarioRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtTokens],
})
export class AuthModule {}
