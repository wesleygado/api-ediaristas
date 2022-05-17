import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { DiariaRequestDto } from 'src/api/diarias/dto/diaria-request.dto';
import { ServicoService } from 'src/api/servicos/servico.service';

@Injectable()
export class ValidatorTempoAtendimento {
  constructor(private readonly servicoService: ServicoService) {}

  async validarTempoAtendimento(diariaDTO: DiariaRequestDto): Promise<number> {
    const tempoAtendimento = diariaDTO.tempoAtendimento;
    const tempoTotal = await this.calcularTempototal(diariaDTO);
    if (tempoAtendimento != tempoTotal) {
      throw new BadRequestException('Tempo Inválido');
    }

    return tempoAtendimento;
  }

  private async calcularTempototal(
    diariaDTO: DiariaRequestDto,
  ): Promise<number> {
    const servico = await this.servicoService.buscarServicoPorId(
      diariaDTO.servico,
    );

    let tempoTotal = 0;
    tempoTotal += diariaDTO.quantidadeBanheiros * servico.horas_banheiro;
    tempoTotal += diariaDTO.quantidadeSalas * servico.horas_sala;
    tempoTotal += diariaDTO.quantidadeCozinhas * servico.horas_cozinha;
    tempoTotal += diariaDTO.quantidadeQuartos * servico.horas_quarto;
    tempoTotal += diariaDTO.quantidadeQuintais * servico.horas_quintal;
    tempoTotal += diariaDTO.quantidadeOutros * servico.horas_outros;
    return tempoTotal;
  }
}
