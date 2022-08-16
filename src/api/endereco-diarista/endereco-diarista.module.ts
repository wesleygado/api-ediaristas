import { Module } from '@nestjs/common';
import { EnderecoDiaristaService } from './endereco-diarista.service';
import { EnderecoDiaristaController } from './endereco-diarista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { EnderecoDiaristaMapper } from './endereco-diarista.mapper';
import { EnderecoDiaristaRepository } from './endereco-diarista.repository';
import { IbgeService } from 'src/core/services/consulta-cidade/consulta-cidade.service';
import { EnderecoDiarista } from './entities/endereco-diarista.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioApi]),
    TypeOrmModule.forFeature([EnderecoDiarista]),
  ],
  controllers: [EnderecoDiaristaController],
  providers: [
    UsuarioRepository,
    EnderecoDiaristaService,
    EnderecoDiaristaMapper,
    IbgeService,
    EnderecoDiaristaRepository,
  ],
})
export class EnderecoDiaristaModule {}
