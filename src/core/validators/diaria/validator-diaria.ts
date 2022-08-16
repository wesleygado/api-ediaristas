import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiariaRequestDto } from 'src/api/diarias/dto/diaria-request.dto';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import { DiaristaRepository } from 'src/api/diaristas/diarista.repository';
import { ServicoService } from 'src/api/servicos/servico.service';
import { ViaCepService } from 'src/core/services/via-cep.service';

@Injectable()
export class ValidatorDiaria {
  constructor(
    private readonly diaristaRepository: DiaristaRepository,
    private readonly servicoService: ServicoService,
    private readonly validatorCep: ViaCepService,
  ) {}

  async validarDiaria(request: DiariaRequestDto, hora?: number) {
    await this.validarHoraAtendimento(request, hora);
    await this.validarDisponibilidade(request);
    await this.validarTempoAtendimento(request);
    await this.validarPrecoAtendimento(request);
    await this.validarCep(request);
    await this.validarIbge(request);
  }

  private validarHoraAtendimento(
    diariaDTO: DiariaRequestDto,
    horaLimiteAtendimento: number,
  ) {
    const horaAtendimento = new Date(diariaDTO.dataAtendimento).getHours();
    const tempoAtendimento = diariaDTO.tempoAtendimento;

    if (horaAtendimento + tempoAtendimento > horaLimiteAtendimento) {
      throw new BadRequestException(
        'Horário de atendimento máximo até as 20:00',
      );
    }
  }

  async validarDisponibilidade(diariaDTO: DiariaRequestDto) {
    const codigoIbge = diariaDTO.codigoIbge;
    const disponibilidade =
      await this.diaristaRepository.repository.existsByCidadesAtendidasCodigoIbge(
        codigoIbge,
      );
    if (disponibilidade === false) {
      throw new BadRequestException(
        'Não há diaristas disponíveis para este CEP',
      );
    }
  }

  async validarIbge(diaria: DiariaRequestDto) {
    const cep = diaria.cep;
    const codigoIbge = diaria.codigoIbge;

    // eslint-disable-next-line prettier/prettier
    const codigoIbgeValido = (await this.validatorCep.buscarEnderecoPorCep(cep))
      .ibge;

    if (codigoIbge !== codigoIbgeValido) {
      throw new BadRequestException('Ibge inválido');
    }

    return codigoIbge;
  }

  async validarTempoAtendimento(diariaDTO: DiariaRequestDto): Promise<void> {
    const tempoAtendimento = diariaDTO.tempoAtendimento;
    const tempoTotal = await this.calcularTempototal(diariaDTO);
    if (tempoAtendimento != tempoTotal) {
      throw new BadRequestException('Tempo Inválido');
    }
  }

  async validarPrecoAtendimento(diariaDTO: DiariaRequestDto): Promise<void> {
    const preco = diariaDTO.preco;
    const valorTotal = await this.calcularValorTotal(diariaDTO);

    const obj = {
      preco: 'preco inválido',
    };

    if (valorTotal != preco) {
      throw new BadRequestException(obj);
    }
  }

  async validarCep(diaria: DiariaRequestDto) {
    const cep = diaria.cep;

    try {
      await this.validatorCep.buscarEnderecoPorCep(cep);
      return diaria.cep;
    } catch (error) {
      throw new BadRequestException('CEP Inválido');
    }
  }

  validarDiariaCancelamento(diaria: Diaria) {
    this.validarStatus(diaria);
    this.validarDataAtendimento(diaria);
  }

  private validarStatus(diaria: Diaria) {
    const isNotPagaOrConfirmada = !(
      diaria.status === DiariaStatus.PAGO ||
      diaria.status === DiariaStatus.CONFIRMADO
    );

    if (isNotPagaOrConfirmada) {
      throw new BadRequestException({
        diaria:
          'Diária a ser cancelada deve estar com o status Pago ou Confirmado',
      });
    }
  }

  private validarDataAtendimento(diaria: Diaria) {
    const hoje = new Date(Date.now());
    const isDataAtendimentoNoPassado = diaria.dataAtendimento;

    if (hoje > isDataAtendimentoNoPassado) {
      throw new BadRequestException({
        diaria:
          'Não é mais possível cancelar a diária, diária ultrapassou a data de atendimento',
      });
    }
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
    return valorTotal;
  }
}
