import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IbgeService } from 'src/core/services/consulta-cidade/consulta-cidade.service';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { CidadesAtendidasRepository } from './cidade-atendida.repository';
import { CidadesAtendidasController } from './cidades-atendidas.controller';
import { CidadesAtendidasService } from './cidades-atendidas.service';
import { CidadesAtendidas } from './entities/cidades-atendidas.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CidadesAtendidas]),
    TypeOrmModule.forFeature([UsuarioApi]),
  ],
  controllers: [CidadesAtendidasController],
  providers: [
    UsuarioRepository,
    CidadesAtendidasService,
    IbgeService,
    CidadesAtendidasRepository,
  ],
})
export class CidadesAtendidasModule {}
