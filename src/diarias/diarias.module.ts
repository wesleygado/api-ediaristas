import { Module } from '@nestjs/common';
import { DiariasService } from './diarias.service';
import { DiariasController } from './diarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from './diaria.repository';
import { DiaristaMapper } from 'src/diaristas/diarista.mapper';
import { DiariaMapper } from './diariaMapper';
import { ServicoService } from 'src/servicos/servico.service';
import { ClienteMapper } from 'src/clientes/clienteMapper';
import { ServicoMapper } from 'src/servicos/servico.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([DiariaRepository])],
  controllers: [DiariasController],
  providers: [
    DiariasService,
    DiariaMapper,
    ServicoService,
    ClienteMapper,
    ServicoMapper,
  ],
})
export class DiariasModule {}
