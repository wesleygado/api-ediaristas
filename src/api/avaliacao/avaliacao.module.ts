import { Module } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from '../diarias/diaria.repository';
import { AvaliacaoRepository } from './avaliacao.repository';
import { AvaliacaoMapper } from './avaliacao.mapper';
import { AvalicaoValidator } from 'src/core/validators/avaliacao/validator-avaliacao';
import { NovaAvaliacaoEvent } from 'src/core/events/nova-avaliacao-event';
import { UsuarioRepository } from '../usuarios/usuario.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiariaRepository]),
    TypeOrmModule.forFeature([AvaliacaoRepository]),
    TypeOrmModule.forFeature([UsuarioRepository]),
  ],
  controllers: [AvaliacaoController],
  providers: [
    AvaliacaoService,
    AvaliacaoMapper,
    AvalicaoValidator,
    NovaAvaliacaoEvent,
  ],
})
export class AvaliacaoModule {}
