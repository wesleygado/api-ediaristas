import { Module } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from '../diarias/diaria.repository';
import { AvaliacaoRepository } from './avaliacao.repository';
import { AvaliacaoMapper } from './avaliacao.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiariaRepository]),
    TypeOrmModule.forFeature([AvaliacaoRepository]),
  ],
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService, AvaliacaoMapper],
})
export class AvaliacaoModule {}
