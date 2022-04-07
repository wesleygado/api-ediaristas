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
          user: 'postmaster@sandbox29f66c0adb8a4f15ba58fb1adca09fa0.mailgun.org',
          pass: 'a615b8f5ae2374960b48d44e75c4c038-38029a9d-2522feb0',
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
