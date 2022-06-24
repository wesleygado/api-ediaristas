import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { classToPlain, instanceToPlain } from 'class-transformer';
import { Diaria } from 'src/api/diarias/entities/diaria.entity';
import { Pagamento } from 'src/api/pagamentos/entities/pagamento.entity';
import { PagamentoStatus } from 'src/api/pagamentos/enum/pagamento-status';
import { PagamentoRepository } from 'src/api/pagamentos/pagamento.repository';
import { GatewayPagamentoService } from '../adapters/gateway-pagamento.service';
import { PagarMeTransacaoRequest } from './dtos/pagar-me-transacao-request.dto';
import { PagarMeTransacaoResponse } from './dtos/pagar-me-transacao-response.dto';

@Injectable()
export class PagarMeService implements GatewayPagamentoService {
  constructor(
    @InjectRepository(PagamentoRepository)
    private readonly pagamento: PagamentoRepository,
  ) {}

  BASE_URL = 'https://api.pagar.me/1';
  API_KEY = process.env.API_KEY_PAGARME;

  async pagar(diaria: Diaria, cardHash: string): Promise<Pagamento> {
    try {
      return await this.tryPagar(diaria, cardHash);
    } catch (error) {
      throw new BadRequestException(error.response.data.errors);
    }
  }

  private async tryPagar(diaria: Diaria, cardHash: string): Promise<Pagamento> {
    const transacaoRequest = this.criarTransacaoRequest(diaria, cardHash);
    const url = `${this.BASE_URL}/transactions`;
    const response = await axios.post(url, instanceToPlain(transacaoRequest));
    return this.criarPagamento(diaria, response.data);
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
    return await this.pagamento.save(pagamento);
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
}
