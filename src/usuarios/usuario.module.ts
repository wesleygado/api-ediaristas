import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { UsuarioMapper } from './usuario.mapper';
import { FotoService } from 'src/fotos/foto.service';
import { FotoRepository } from 'src/fotos/foto.repository';
import { EmailJaExiste } from '../core/validators/usuario/validator-email';
import { CpfJaExiste } from 'src/core/validators/usuario/validator-cpf';
import { ChavePixJaExiste } from 'src/core/validators/usuario/validator-chave-pix';
import { ValidatorPasswordConfirmation } from 'src/core/validators/usuario/validator-password-confirmation';
import { MailModule } from 'src/mail/mail.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtTokens } from 'src/auth/strategies/jwt-tokens';
import { TokensService } from 'src/tokens/tokens.service';
import { TokensModule } from 'src/tokens/tokens.module';
import { TokenRepository } from 'src/tokens/tokens.repository';
import { HateoasUsuario } from 'src/core/hateoas/hateoas-usuario';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository]),
    TypeOrmModule.forFeature([FotoRepository]),
    TypeOrmModule.forFeature([TokenRepository]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [UsuarioController],
  providers: [
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
    HateoasUsuario,
  ],
})
export class UsuariosModule {}
