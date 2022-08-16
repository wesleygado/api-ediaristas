import { HttpModule } from '@nestjs/axios';
import { DiaristaService } from './diarista.service';
import { DiaristaController } from './diarista.controller';
import { DiaristaRepository } from './diarista.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ViaCepService } from 'src/core/services/via-cep.service';
import { DiaristaMapper } from './diarista.mapper';
import { AvaliacaoRepository } from '../avaliacao/avaliacao.repository';
import { Avaliacao } from '../avaliacao/entities/avaliacao.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioApi]),
    HttpModule,
    TypeOrmModule.forFeature([Avaliacao]),
  ],
  controllers: [DiaristaController],
  providers: [
    DiaristaService,
    ViaCepService,
    DiaristaMapper,
    AvaliacaoRepository,
    DiaristaRepository,
  ],
})
export class DiaristaModule {}
