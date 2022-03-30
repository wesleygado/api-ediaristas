import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioMapper } from './usuario.mapper';
import { FotoService } from 'src/fotos/foto.service';
import { FotoRepository } from 'src/fotos/foto.repository';
import { EmailJaExiste } from '../core/validators/usuario/validator-email';
import { CpfJaExiste } from 'src/core/validators/usuario/validator-cpf';
import { ChavePixJaExiste } from 'src/core/validators/usuario/validator-chave-pix';
import { ValidatorPasswordConfirmation } from 'src/core/validators/usuario/validator-password-confirmation';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository]),
    TypeOrmModule.forFeature([FotoRepository]),
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
  ],
})
export class UsuariosModule {}
