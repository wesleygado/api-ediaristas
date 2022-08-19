import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import { DiaristaIndiceService } from '../services/diarista-indice/diarista-indice.service';
import { GatewayPagamentoService } from '../services/getaway-pagamento/adapters/gateway-pagamento.service';

@Injectable()
export class ScheduleTask {
  constructor(
    private readonly diariaRepository: DiariaRepository,
    private readonly indice: DiaristaIndiceService,
    private readonly pagamento: GatewayPagamentoService,
  ) {}
  private readonly logger = new Logger(ScheduleTask.name);

  @Cron(CronExpression.EVERY_10_HOURS)
  async selecionarDiaristaDaDiaria() {
    this.logger.debug(
      'Iniciada Task de Seleção de diariastas para diárias aptas',
    );

    const diariasAptasParaSelecao =
      await this.diariaRepository.repository.getAptasParaSelecaoDiarista();

    diariasAptasParaSelecao.forEach(
      async (diaria) => await this.selecionarDiarista(diaria),
    );

    this.logger.debug('Task de seleção de diaristas finalizada');
  }

  @Cron(CronExpression.EVERY_10_HOURS)
  async cancelarDiariaSemCandidato() {
    this.logger.debug(
      'Iniciada Task de cancelamento de diárias sem candidatos',
    );

    const diariasAptasParaCancelamento =
      await this.diariaRepository.repository.getAptasParaCancelamento();

    diariasAptasParaCancelamento.map(
      async (diaria) => await this.cancelarDiaria(diaria),
    );

    this.logger.debug('Task de cancelamento de diárias finalizada');
  }

  private cancelarDiaria(diaria: Diaria): void {
    this.logger.debug('Cancelando diaria de id ' + diaria.id);
    if (diaria.status === DiariaStatus.PAGO) {
      this.logger.debug('Reembolsoando pagamento de diaria de id ' + diaria.id);
      this.pagamento.realizarEstornoTotal(diaria);
    }

    diaria.status = DiariaStatus.CANCELADO;
    this.diariaRepository.repository.save(diaria);
    this.logger.debug('Diaria de id ' + diaria.id + ' cancelada com sucesso');
  }

  private async selecionarDiarista(diaria: Diaria) {
    this.logger.debug(
      `Selecionando Melhor Diarista para a diária de id: ${diaria.id}`,
    );
    const melhorDiarista = await this.indice.selecionarMelhorDiarista(diaria);
    diaria.diarista = melhorDiarista;
    diaria.status = DiariaStatus.CONFIRMADO;
    await this.diariaRepository.repository.save(diaria);
    this.logger.debug(`Selecionado o diarista de id: ${diaria.diarista.id} `);
  }
}
