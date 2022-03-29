import { Module } from '@nestjs/common';
import { UsuariosModule } from './usuarios/usuario.module';
import * as ormconfig from 'src/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoModule } from './fotos/foto.module';
import { CidadesAtendidasModule } from './cidades-atendidas/cidades-atendidas.module';
import { DiaristaModule } from './diaristas/diarista.module';
import { EnderecoModule } from './consulta-endereco/endereco.module';
import { ServicoModule } from './servicos/servico.module';

@Module({
  imports: [
    UsuariosModule,
    TypeOrmModule.forRoot(ormconfig),
    FotoModule,
    CidadesAtendidasModule,
    DiaristaModule,
    EnderecoModule,
    ServicoModule,
  ],
})
export class AppModule {}
