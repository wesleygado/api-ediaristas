import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensModule } from 'src/auth/tokens/tokens.module';
import { TokenRepository } from 'src/auth/tokens/tokens.repository';
import { TokensService } from 'src/auth/tokens/tokens.service';
import { UsuarioMapper } from 'src/api/usuarios/usuario.mapper';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';

import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtTokens } from 'src/auth/strategies/jwt-tokens';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

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
