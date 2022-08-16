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
import { Avaliacao } from './entities/avaliacao.entity';
import { Diaria } from '../diarias/entities/diaria.entity';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diaria]),
    TypeOrmModule.forFeature([Avaliacao]),
    TypeOrmModule.forFeature([UsuarioApi]),
  ],
  controllers: [AvaliacaoController],
  providers: [
    UsuarioRepository,
    DiariaRepository,
    AvaliacaoService,
    AvaliacaoMapper,
    AvalicaoValidator,
    NovaAvaliacaoEvent,
    AvaliacaoRepository,
  ],
})
export class AvaliacaoModule {}
