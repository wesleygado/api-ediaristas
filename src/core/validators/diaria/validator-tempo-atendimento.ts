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
    tempoTotal += diariaDTO.quantidadeBanheiros * servico.horasBanheiro;
    tempoTotal += diariaDTO.quantidadeSalas * servico.horasSala;
    tempoTotal += diariaDTO.quantidadeCozinhas * servico.horasCozinha;
    tempoTotal += diariaDTO.quantidadeQuartos * servico.horasQuarto;
    tempoTotal += diariaDTO.quantidadeQuintais * servico.horasQuintal;
    tempoTotal += diariaDTO.quantidadeOutros * servico.horasOutros;
    return tempoTotal;
  }
}
