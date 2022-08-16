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
import { AvaliacaoRepository } from '../avaliacao/avaliacao.repository';
import { Token } from 'src/auth/tokens/entities/token.entity';
import { Diaria } from '../diarias/entities/diaria.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { Avaliacao } from '../avaliacao/entities/avaliacao.entity';
import { UsuarioController } from '../usuarios/usuario.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    TypeOrmModule.forFeature([Diaria]),
    TypeOrmModule.forFeature([UsuarioApi]),
    TypeOrmModule.forFeature([Avaliacao]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
  controllers: [MeController],
  providers: [
    AvaliacaoRepository,
    UsuarioRepository,
    DiariaRepository,
    TokenRepository,
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
