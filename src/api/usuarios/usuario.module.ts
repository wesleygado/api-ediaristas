import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioMapper } from './usuario.mapper';
import { FotoService } from 'src/api/fotos/foto.service';
import { FotoRepository } from 'src/api/fotos/foto.repository';
import { EmailJaExiste } from '../../core/validators/usuario/validator-email';
import { CpfJaExiste } from 'src/core/validators/usuario/validator-cpf';
import { ChavePixJaExiste } from 'src/core/validators/usuario/validator-chave-pix';
import { ValidatorPasswordConfirmation } from 'src/core/validators/usuario/validator-password-confirmation';
import { MailModule } from 'src/core/services/mail/mail.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtTokens } from 'src/auth/strategies/jwt-tokens';
import { TokensService } from 'src/auth/tokens/tokens.service';
import { TokenRepository } from 'src/auth/tokens/tokens.repository';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';
import { AvaliacaoRepository } from '../avaliacao/avaliacao.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository]),
    TypeOrmModule.forFeature([FotoRepository]),
    TypeOrmModule.forFeature([TokenRepository]),
    TypeOrmModule.forFeature([AvaliacaoRepository]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [UsuarioController],
  providers: [
    HateoasUsuario,
    ChavePixJaExiste,
    CpfJaExiste,
    EmailJaExiste,
    UsuarioService,
    UsuarioMapper,
    FotoService,
    ValidatorPasswordConfirmation,
    AuthService,
    JwtTokens,
    TokensService,
  ],
})
export class UsuarioModule {}
