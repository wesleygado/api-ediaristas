import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';

export class ValidatorConfirmacaoDiaria {
  async validarStatusConfirmado(diaria: Diaria) {
    if (diaria.status !== DiariaStatus.CONFIRMADO) {
      throw new BadRequestException('Diária precisa estar confirmada');
    }
  }

  async validarDonoDaDiaria(idCliente: number, idClienteDiaria: number) {
    if (idCliente !== idClienteDiaria) {
      throw new ForbiddenException('Acesso Negado');
    }
  }

  async validarDataPassadoDiaria(diaria: Diaria) {
    const hoje = new Date(Date.now());
    const dataAtendimentoDiaria = diaria.dataAtendimento;

    if (hoje < dataAtendimentoDiaria) {
      throw new BadRequestException({
        dataAtendimento: 'A data de atendimento deve estar no passado',
      });
    }
  }

  async validarDiariaDiarista(diaria: Diaria) {
    if (!diaria.diarista) {
      throw new BadRequestException({
        diarista: 'Diária não possui diarista selecionado',
      });
    }
  }
}
