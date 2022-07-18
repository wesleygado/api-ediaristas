import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensModule } from 'src/auth/tokens/tokens.module';
import { TokenRepository } from 'src/auth/tokens/tokens.repository';
import { TokensService } from 'src/auth/tokens/tokens.service';
import { UsuarioMapper } from 'src/api/usuarios/usuario.mapper';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';
import { JwtTokens } from './strategies/jwt-tokens';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsuarioModule } from 'src/api/usuarios/usuario.module';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UsuarioRepository]),
    TypeOrmModule.forFeature([TokenRepository]),
    TokensModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtTokens,
    TokensService,
    UsuarioMapper,
    RolesGuard,
  ],
})
export class AuthModule {}
