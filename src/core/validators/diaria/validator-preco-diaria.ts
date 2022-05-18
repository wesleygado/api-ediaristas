import { BadRequestException, Injectable } from '@nestjs/common';
import { DiariaRequestDto } from 'src/api/diarias/dto/diaria-request.dto';
import { ServicoService } from 'src/api/servicos/servico.service';

@Injectable()
export class ValidatorPrecoDiaria {
  constructor(private readonly servicoService: ServicoService) {}

  async validarPrecoAtendimento(diariaDTO: DiariaRequestDto): Promise<number> {
    const preco = diariaDTO.preco;
    const valorTotal = await this.calcularValorTotal(diariaDTO);

    const obj = {
      preco: 'preco inválido',
    };

    if (valorTotal != preco) {
      throw new BadRequestException(obj);
    }

    return valorTotal;
  }

  private async calcularValorTotal(
    diariaDTO: DiariaRequestDto,
  ): Promise<number> {
    const servico = await this.servicoService.buscarServicoPorId(
      diariaDTO.servico,
    );

    let valorTotal = 0;
    valorTotal += diariaDTO.quantidadeBanheiros * servico.valorBanheiro;
    valorTotal += diariaDTO.quantidadeSalas * servico.valorSala;
    valorTotal += diariaDTO.quantidadeCozinhas * servico.valorCozinha;
    valorTotal += diariaDTO.quantidadeQuartos * servico.valorQuarto;
    valorTotal += diariaDTO.quantidadeQuintais * servico.valorQuintal;
    valorTotal += diariaDTO.quantidadeOutros * servico.valorOutros;

    if (valorTotal < servico.valor_minimo) {
      return servico.valor_minimo / 100;
    }
    return valorTotal / 100;
  }
}
