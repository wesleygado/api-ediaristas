import { Module } from '@nestjs/common';
import { MeService } from './me.service';
import { MeController } from './me.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { UsuarioMapper } from 'src/api/usuarios/usuario.mapper';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokens } from 'src/auth/strategies/jwt-tokens';
import { TokensService } from 'src/auth/tokens/tokens.service';
import { TokenRepository } from 'src/auth/tokens/tokens.repository';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';
import { GoogleMatrixService } from 'src/core/services/consulta-distancia/providers/google-matrix.service';
import { DiaristaIndiceService } from 'src/core/services/diarista-indice/diarista-indice.service';
import { DiariaRepository } from '../diarias/diaria.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenRepository]),
    TypeOrmModule.forFeature([DiariaRepository]),
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
    GoogleMatrixService,
    DiaristaIndiceService,
  ],
})
export class MeModule {}
