import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuario.module';
import * as ormconfig from 'src/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './fotos/foto.module';
import { CidadesAtendidasModule } from './cidades-atendidas/cidades-atendidas.module';
import { DiaristaModule } from './diaristas/diarista.module';
import { EnderecoModule } from './consulta-endereco/endereco.module';
import { ServicoModule } from './servicos/servico.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { MeModule } from './me/me.module';
import { TokensModule } from './tokens/tokens.module';
import { AppController } from './app.controller';
import { HateoasIndex } from './core/hateoas/hateoas-index';
import { UrlGeneratorModule } from 'nestjs-url-generator';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from 'src/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsuariosModule,
    TypeormConfigModule,
    FotoModule,
    CidadesAtendidasModule,
    DiaristaModule,
    EnderecoModule,
    ServicoModule,
    FotoModule,
    MailModule,
    AuthModule,
    MeModule,
    TokensModule,
    UrlGeneratorModule.forRoot({
      appUrl: 'https://localhost:3000',
    }),
  ],
  controllers: [AppController],
  providers: [HateoasIndex],
})
export class AppModule {}
