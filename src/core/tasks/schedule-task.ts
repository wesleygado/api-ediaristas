import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import { DiaristaIndiceService } from '../services/diarista-indice/diarista-indice.service';

@Injectable()
export class ScheduleTask {
  constructor(
    @InjectRepository(DiariaRepository)
    private readonly diaria: DiariaRepository,
    private readonly indice: DiaristaIndiceService,
  ) {}
  private readonly logger = new Logger(ScheduleTask.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  async selecionarDiaristaDaDiaria() {
    this.logger.debug(
      'Iniciada Task de Seleção de diariastas para diárias aptas',
    );

    const diariasAptasParaSelecao =
      await this.diaria.getAptasParaSelecaoDiarista();

    diariasAptasParaSelecao.forEach(
      async (diaria) => await this.selecionarDiarista(diaria),
    );

    this.logger.debug('Task de seleção de diaristas finalizada');
  }

  private async selecionarDiarista(diaria: Diaria) {
    this.logger.debug(
      `Selecionando Melhor Diarista para a diária de id: ${diaria.id}`,
    );
    const melhorDiarista = await this.indice.selecionarMelhorDiarista(diaria);
    diaria.diarista = melhorDiarista;
    diaria.status = DiariaStatus.CONFIRMADO;
    await this.diaria.save(diaria);
    this.logger.debug(`Selecionado o diarista de id: ${diaria.diarista.id} `);
  }
}
