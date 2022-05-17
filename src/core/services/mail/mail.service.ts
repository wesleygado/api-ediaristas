import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
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
}
