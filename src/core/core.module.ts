import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { ConfirmacaoPresencaController } from './services/confirmacao-presenca/confirmacao-presenca.controller';
import { ConfirmacaoPresencaService } from './services/confirmacao-presenca/confirmacao-presenca.service';
import { GoogleMatrixService } from './services/consulta-distancia/providers/google-matrix.service';
import { DiaristaIndiceService } from './services/diarista-indice/diarista-indice.service';
import { ScheduleTask } from './tasks/schedule-task';
import { ValidatorConfirmacaoDiaria } from './validators/confirmacao-diaria/validator-confirmacao-diaria';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([DiariaRepository]),
  ],
  controllers: [ConfirmacaoPresencaController],
  providers: [
    ScheduleTask,
    DiaristaIndiceService,
    GoogleMatrixService,
    ConfirmacaoPresencaService,
    ValidatorConfirmacaoDiaria,
  ],
})
export class CoreModule {}
