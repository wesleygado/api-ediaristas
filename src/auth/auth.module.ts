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
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { Token } from './tokens/entities/token.entity';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([UsuarioApi]),
    TypeOrmModule.forFeature([Token]),
    TokensModule,
  ],
  controllers: [AuthController],
  providers: [
    TokenRepository,
    UsuarioRepository,
    AuthService,
    JwtStrategy,
    JwtTokens,
    TokensService,
    UsuarioMapper,
    RolesGuard,
  ],
})
export class AuthModule {}
