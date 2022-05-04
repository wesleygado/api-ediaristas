import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';
import { UsuarioMapper } from 'src/usuarios/usuario.mapper';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtTokens } from 'src/auth/strategies/jwt-tokens';
import { TokensService } from 'src/tokens/tokens.service';
import { TokenRepository } from 'src/tokens/tokens.repository';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenRepository]),
    TypeOrmModule.forFeature([UsuarioRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [MeController],
  providers: [
    MeService,
    UsuarioMapper,
    JwtTokens,
    TokensService,
    HateoasUsuario,
  ],
})
export class MeModule {}
