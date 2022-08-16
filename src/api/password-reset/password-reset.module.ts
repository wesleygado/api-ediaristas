import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from '../usuarios/usuario.repository';
import { PasswordResetRepository } from './password-reset.repository';
import { MailService } from 'src/core/services/mail/mail.service';
import { PasswordReset } from './entities/password-reset.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioApi]),
    TypeOrmModule.forFeature([PasswordReset]),
  ],
  controllers: [PasswordResetController],
  providers: [
    UsuarioRepository,
    PasswordResetService,
    MailService,
    PasswordResetRepository,
  ],
})
export class PasswordResetModule {}
