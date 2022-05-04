import { BadRequestException, Injectable } from '@nestjs/common';
import { DiariaRequestDto } from 'src/diarias/dto/diaria-request.dto';
import { ServicoService } from 'src/servicos/servico.service';

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
    valorTotal += diariaDTO.quantidadeBanheiros * servico.valor_banheiro;
    valorTotal += diariaDTO.quantidadeSalas * servico.valor_sala;
    valorTotal += diariaDTO.quantidadeCozinhas * servico.valor_cozinha;
    valorTotal += diariaDTO.quantidadeQuartos * servico.valor_quarto;
    valorTotal += diariaDTO.quantidadeQuintais * servico.valor_quintal;
    valorTotal += diariaDTO.quantidadeOutros * servico.valor_outros;

    if (valorTotal < servico.valor_minimo) {
      return servico.valor_minimo / 100;
    }
    return valorTotal / 100;
  }
}
