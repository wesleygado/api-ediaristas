import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { PagamentoRepository } from 'src/api/pagamentos/pagamento.repository';
import { ConfirmacaoPresencaController } from './services/confirmacao-presenca/confirmacao-presenca.controller';
import { ConfirmacaoPresencaService } from './services/confirmacao-presenca/confirmacao-presenca.service';
import { GoogleMatrixService } from './services/consulta-distancia/providers/google-matrix.service';
import { DiaristaIndiceService } from './services/diarista-indice/diarista-indice.service';
import { GatewayPagamentoService } from './services/getaway-pagamento/adapters/gateway-pagamento.service';
import { PagarMeService } from './services/getaway-pagamento/providers/pagarme.service';
import { ScheduleTask } from './tasks/schedule-task';
import { ValidatorConfirmacaoDiaria } from './validators/confirmacao-diaria/validator-confirmacao-diaria';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([DiariaRepository]),
    TypeOrmModule.forFeature([PagamentoRepository]),
  ],
  controllers: [ConfirmacaoPresencaController],
  providers: [
    ScheduleTask,
    DiaristaIndiceService,
    GoogleMatrixService,
    ConfirmacaoPresencaService,
    ValidatorConfirmacaoDiaria,
    {
      provide: GatewayPagamentoService,
      useClass: PagarMeService,
    },
  ],
})
export class CoreModule {}
