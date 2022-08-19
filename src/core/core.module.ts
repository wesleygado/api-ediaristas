import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvaliacaoRepository } from 'src/api/avaliacao/avaliacao.repository';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { Pagamento } from 'src/api/pagamentos/entities/pagamento.entity';
import { PagamentoRepository } from 'src/api/pagamentos/pagamento.repository';
import { ConfirmacaoPresencaController } from '../api/confirmacao-presenca/confirmacao-presenca.controller';
import { ConfirmacaoPresencaService } from '../api/confirmacao-presenca/confirmacao-presenca.service';
import { ConsultaCidade } from './services/consulta-cidade/consulta-cidade.interface';
import { IbgeService } from './services/consulta-cidade/consulta-cidade.service';
import { ConsultaDistanciaCep } from './services/consulta-distancia/consulta-distancia.interface';
import { GoogleMatrixService } from './services/consulta-distancia/providers/google-matrix.service';
import { DiaristaIndiceService } from './services/diarista-indice/diarista-indice.service';
import { DiaristaServiceSelecao } from './services/diarista-indice/providers/diarista-service.interface';
import { GatewayPagamentoService } from './services/getaway-pagamento/adapters/gateway-pagamento.service';
import { PagarMeService } from './services/getaway-pagamento/providers/pagarme.service';
import { ScheduleTask } from './tasks/schedule-task';
import { ValidatorConfirmacaoDiaria } from './validators/confirmacao-diaria/validator-confirmacao-diaria';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Diaria]),
    TypeOrmModule.forFeature([Pagamento]),
  ],
  controllers: [ConfirmacaoPresencaController],
  providers: [
    PagamentoRepository,
    DiariaRepository,
    ScheduleTask,
    DiaristaIndiceService,
    ConfirmacaoPresencaService,
    ValidatorConfirmacaoDiaria,
    GoogleMatrixService,
    {
      provide: GatewayPagamentoService,
      useClass: PagarMeService,
    },
    {
      provide: ConsultaCidade,
      useClass: IbgeService,
    },
    {
      provide: ConsultaDistanciaCep,
      useClass: GoogleMatrixService,
    },
    {
      provide: DiaristaServiceSelecao,
      useClass: DiaristaIndiceService,
    },
  ],
})
export class CoreModule {}
