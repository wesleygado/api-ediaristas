import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensModule } from 'src/tokens/tokens.module';
import { TokenRepository } from 'src/tokens/tokens.repository';
import { TokensService } from 'src/tokens/tokens.service';
import { UsuarioMapper } from 'src/usuarios/usuario.mapper';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/roles.guard';
import { JwtTokens } from './strategies/jwt-tokens';
import { JwtStrategy } from './strategies/jwt.strategy';

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
