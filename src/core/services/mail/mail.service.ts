import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PasswordReset } from 'src/api/password-reset/entities/password-reset.entity';
import { UsuarioApi } from '../../../api/usuarios/entities/usuario.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async enviarEmailDeConfirmacao(usuario: UsuarioApi) {
    let tipoUsuario: boolean;

    if (usuario.tipoUsuario == 1) {
      tipoUsuario = true;
    }

    if (usuario.tipoUsuario == 2) {
      tipoUsuario = false;
    }

    await this.mailerService.sendMail({
      to: 'wesley.gado@treinaweb.com.br',
      from: '"E-Diaristas" <ediaristas@suporte.com>', // override default from
      subject: 'Bem vindo ao Ediaristas',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: {
        nome: usuario.nomeCompleto,
        tipoUsuario: tipoUsuario,
      },
    });
  }

  async enviarEmailDeResetDeSenha(passwordReset: PasswordReset) {
    await this.mailerService.sendMail({
      to: 'wesley.gado@treinaweb.com.br',
      from: 'E-Diaristas <ediaristas@suporte.com>',
      subject: 'Solicitação de Reset de Senha - Ediaristas',
      template: 'resetar-senha',
      context: {
        link: `${process.env.FRONTEND_HOST}/admin/resetar-senha/confirmacao?token=${passwordReset.token}`,
      },
    });
  }
}
