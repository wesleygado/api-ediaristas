import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from '../usuarios/usuario.repository';
import { PasswordResetRepository } from './password-reset.repository';
import { MailService } from 'src/core/services/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository]),
    TypeOrmModule.forFeature([PasswordResetRepository]),
  ],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, MailService],
})
export class PasswordResetModule {}
