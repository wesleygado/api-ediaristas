import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IbgeService } from 'src/consulta-cidade/consulta-cidade.service';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';
import { CidadesAtendidasRepository } from './cidade-atendida.repository';
import { CidadesAtendidasController } from './cidades-atendidas.controller';
import { CidadesAtendidasService } from './cidades-atendidas.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CidadesAtendidasRepository]),
    TypeOrmModule.forFeature([UsuarioRepository]),
  ],
  controllers: [CidadesAtendidasController],
  providers: [CidadesAtendidasService, IbgeService],
})
export class CidadesAtendidasModule {}
