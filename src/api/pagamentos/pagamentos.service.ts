import { Injectable, NotFoundException } from '@nestjs/common';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import { PagamentoRequestDto } from './dto/paramento-request.dto';
import { ValidatorPagamentoStatus } from 'src/core/validators/pagamento/validator-pagamento';
import { PagamentoStatus } from './enum/pagamento-status';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { GatewayPagamentoService } from 'src/core/services/getaway-pagamento/adapters/gateway-pagamento.service';
import { PagamentoResponseDto } from './dto/pagamento-response.dto';
import { PagamentoRepository } from './pagamento.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PagamentoMapper } from './pagamento.mapper';
import { Pagamento } from './entities/pagamento.entity';

@Injectable()
export class PagamentosService {
  constructor(
    @InjectRepository(DiariaRepository)
    private diariaRepository: DiariaRepository,
    private pagamentoValidator: ValidatorPagamentoStatus,
    private gateway: GatewayPagamentoService,
    @InjectRepository(PagamentoRepository)
    private pagamentoRepository: PagamentoRepository,
    private pagamentoMapper: PagamentoMapper,
  ) {}

  async pagar(
    pagamentoDto: PagamentoRequestDto,
    id: number,
    usuarioLogado: UsuarioApi,
  ): Promise<string> {
    const diaria = await this.buscarDiariaPorId(id);
    await this.pagamentoValidator.validarClienteDiaria(usuarioLogado, diaria);
    await this.pagamentoValidator.validarStatus(diaria);

    const pagamento = await this.gateway.pagar(diaria, pagamentoDto.cardHash);

    if (pagamento.status === PagamentoStatus.ACEITO) {
      diaria.status = DiariaStatus.PAGO;
      this.diariaRepository.save(diaria);
      return 'Diária paga com sucesso';
    }

    return 'Pagamento Recusado';
  }

  private async buscarDiariaPorId(id: number) {
    const diaria = await this.diariaRepository.findOne({ id: id });

    if (!diaria) {
      throw new NotFoundException('Diária não encontrada');
    }

    return diaria;
  }

  async listarPagamentoPorUsuarioLogado(
    usuarioLogado: UsuarioApi,
  ): Promise<PagamentoResponseDto[]> {
    const pagamentos =
      await this.pagamentoRepository.findPagamentosPorUsuarioLogado(
        usuarioLogado,
      );
    return pagamentos.map((pagamento) =>
      this.pagamentoMapper.toResponse(pagamento),
    );
  }
}
