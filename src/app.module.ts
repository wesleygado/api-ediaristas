import { Module } from '@nestjs/common';
import { UsuariosModule } from './api/usuarios/usuario.module';
import { FotoModule } from './api/fotos/foto.module';
import { CidadesAtendidasModule } from './api/cidades-atendidas/cidades-atendidas.module';
import { DiaristaModule } from './api/diaristas/diarista.module';
import { EnderecoModule } from './core/services/consulta-endereco/endereco.module';
import { ServicoModule } from './api/servicos/servico.module';
import { MailModule } from './core/services/mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { MeModule } from './api/me/me.module';
import { TokensModule } from './auth/tokens/tokens.module';
import { AppController } from './app.controller';
import { HateoasIndex } from './core/hateoas/hateoas-index';
import { UrlGeneratorModule } from 'nestjs-url-generator';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from 'src/database.module';
import { DiariasModule } from './api/diarias/diarias.module';
import { ClienteModule } from './api/clientes/cliente.module';
import { PagamentosModule } from './api/pagamentos/pagamentos.module';
import { EnderecoDiaristaModule } from './api/endereco-diarista/endereco-diarista.module';
import { CandidaturaModule } from './api/candidaturas/candidatura.module';
import { OportunidadeModule } from './api/oportunidade/oportunidade.module';

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
      appUrl: 'http://localhost:8000',
    }),
    DiariasModule,
    ClienteModule,
    PagamentosModule,
    EnderecoDiaristaModule,
    CandidaturaModule,
    OportunidadeModule,
  ],
  controllers: [AppController],
  providers: [HateoasIndex],
})
export class AppModule {}
