import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuario.module';
import * as ormconfig from 'src/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './fotos/foto.module';
import { CidadesAtendidasModule } from './cidades-atendidas/cidades-atendidas.module';
import { DiaristaModule } from './diaristas/diarista.module';
import { EnderecoModule } from './consulta-endereco/endereco.module';
import { ServicoModule } from './servicos/servico.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { MeModule } from './me/me.module';

@Module({
  imports: [
    UsuariosModule,
    TypeOrmModule.forRoot(ormconfig),
    FotoModule,
    CidadesAtendidasModule,
    DiaristaModule,
    EnderecoModule,
    ServicoModule,
    FotoModule,
    MailModule,
    AuthModule,
    MeModule,
  ],
})
export class AppModule {}
