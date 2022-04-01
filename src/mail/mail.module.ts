import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailgun.org',
        secure: false,
        port: 587,
        auth: {
          user: 'postmaster@sandboxccaa5275c5d4420fb6d924a062e1d093.mailgun.org',
          pass: 'f02b288116f824f2bd344799457d5422-62916a6c-949dfb2b',
        },
        ignoreTLS: true,
      },
      defaults: {
        from: '"No Reply" <noreply@ediaristas.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
