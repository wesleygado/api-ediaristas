import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async enviarEmailDeConfirmacao(usuario: UsuarioApi) {
    const url = `teste-email.com.br`;

    await this.mailerService.sendMail({
      to: 'wesley.gado@treinaweb.com.br',
      from: '"E-Diaristas" <ediaristas@suporte.com>', // override default from
      subject: 'Bem vindo ao Ediaristas',
      template: 'confirmation', // `.hbs` extension is appended automatically
      context: {
        name: usuario.nomeCompleto,
        url,
      },
    });
  }
}
