import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import { Pagamento } from 'src/api/pagamentos/entities/pagamento.entity';
import { PagamentoStatus } from 'src/api/pagamentos/enum/pagamento-status';
import { PagamentoRepository } from 'src/api/pagamentos/pagamento.repository';
import { GatewayPagamentoService } from '../adapters/gateway-pagamento.service';
import { PagarMeReembolsoRequest } from './dtos/pagar-me-reembolso-request.dto';
import { PagarMeReembolsoResponse } from './dtos/pagar-me-reembolso-response.dto';
import { PagarMeTransacaoRequest } from './dtos/pagar-me-transacao-request.dto';
import { PagarMeTransacaoResponse } from './dtos/pagar-me-transacao-response.dto';

@Injectable()
export class PagarMeService implements GatewayPagamentoService {
  constructor(private readonly pagamentoRepository: PagamentoRepository) {}

  BASE_URL = 'https://api.pagar.me/1';
  API_KEY = process.env.API_KEY_PAGARME;

  async pagar(diaria: Diaria, cardHash: string): Promise<Pagamento> {
    try {
      return await this.tryPagar(diaria, cardHash);
    } catch (error) {
      throw new BadRequestException(error.response.data.errors);
    }
  }
  async realizarEstornoTotal(diaria: Diaria): Promise<Pagamento> {
    try {
      return await this.tryRealizerEstornoTotal(diaria);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async realizarEstornoParcial(diaria: Diaria): Promise<Pagamento> {
    try {
      return await this.tryRealizerEstornoParcial(diaria);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async tryRealizerEstornoParcial(diaria: Diaria): Promise<Pagamento> {
    const request = new PagarMeReembolsoRequest();
    request.apiKey = this.API_KEY;
    request.amount = this.converterReaisParaCentavos(diaria.preco) / 2;
    return this.realizarEstorno(diaria, request);
  }

  private async tryRealizerEstornoTotal(diaria: Diaria): Promise<Pagamento> {
    const request = new PagarMeReembolsoRequest();
    request.apiKey = this.API_KEY;
    return this.realizarEstorno(diaria, request);
  }

  private async tryPagar(diaria: Diaria, cardHash: string): Promise<Pagamento> {
    const transacaoRequest = this.criarTransacaoRequest(diaria, cardHash);
    const url = `${this.BASE_URL}/transactions`;
    const response = await axios.post(url, instanceToPlain(transacaoRequest));
    return this.criarPagamento(diaria, response.data);
  }

  private async realizarEstorno(
    diaria: Diaria,
    request: PagarMeReembolsoRequest,
  ): Promise<Pagamento> {
    this.validarDiariaParaReembolso(diaria);
    const pagamento = await this.getPagamentoDaDiaria(diaria);
    const url = `${this.BASE_URL}/transactions/${pagamento.transacaoId}/refund`;
    const response = await axios.post(url, instanceToPlain(request));
    return this.criarPagamentoReembolso(diaria, response.data);
  }

  private async criarPagamento(
    diaria: Diaria,
    body: PagarMeTransacaoResponse,
  ): Promise<Pagamento> {
    const pagamento = new Pagamento();
    pagamento.valor = diaria.preco;
    pagamento.transacaoId = body.id;
    pagamento.status = this.criarPagamentoStatus(body.status);
    pagamento.diaria = diaria;
    return await this.pagamentoRepository.repository.save(pagamento);
  }

  private async criarPagamentoReembolso(
    diaria: Diaria,
    body: PagarMeReembolsoResponse,
  ): Promise<Pagamento> {
    const response = plainToInstance(PagarMeReembolsoResponse, body);
    const pagamento = new Pagamento();
    pagamento.valor = this.converterCentavosParaReais(response.refundedAmount);
    pagamento.transacaoId = response.id;
    pagamento.status = PagamentoStatus.REEMBOLSADO;
    pagamento.diaria = diaria;
    return await this.pagamentoRepository.repository.save(pagamento);
  }

  private criarPagamentoStatus(transacaoStatus: string) {
    return transacaoStatus === 'paid'
      ? PagamentoStatus.ACEITO
      : PagamentoStatus.REPROVADO;
  }

  private criarTransacaoRequest(
    diaria: Diaria,
    cardHash: string,
  ): PagarMeTransacaoRequest {
    const transacaoRequest = new PagarMeTransacaoRequest();
    transacaoRequest.amount = this.converterReaisParaCentavos(diaria.preco);
    transacaoRequest.cardHash = cardHash;
    transacaoRequest.async = false;
    transacaoRequest.apiKey = this.API_KEY;
    return transacaoRequest;
  }

  private converterReaisParaCentavos(preco: number): number {
    return preco * 100;
  }

  private converterCentavosParaReais(preco: number): number {
    return preco / 100;
  }

  private async getPagamentoDaDiaria(diaria: Diaria): Promise<Pagamento> {
    const pagamento =
      await this.pagamentoRepository.repository.findPagamentosParaReembolso(
        diaria,
      );

    if (!pagamento) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    return pagamento;
  }

  private validarDiariaParaReembolso(diaria: Diaria) {
    const isNotPagaOrConfirmada = !(
      diaria.status === DiariaStatus.PAGO ||
      diaria.status === DiariaStatus.CONFIRMADO
    );

    if (isNotPagaOrConfirmada) {
      throw new BadRequestException(
        'Não pode ser feito o reembolse de diaria pois não há pagamento',
      );
    }
  }
}
