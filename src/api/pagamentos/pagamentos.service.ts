import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import DiariaStatus from 'src/api/diarias/enum/diaria-status';
import { PagamentoRequestDto } from './dto/paramento-request.dto';
import { ValidatorPagamentoStatus } from 'src/core/validators/pagamento/validator-pagamento';
import { PagamentoStatus } from './enum/pagamento-status';
import { UsuarioApi } from '../usuarios/entities/usuario.entity';
import { GatewayPagamentoService } from 'src/core/services/getaway-pagamento/adapters/gateway-pagamento.service';
import { PagamentoResponseDto } from './dto/pagamento-response.dto';
import { PagamentoRepository } from './pagamento.repository';
import { PagamentoMapper } from './pagamento.mapper';

@Injectable()
export class PagamentosService {
  constructor(
    private diariaRepository: DiariaRepository,
    private pagamentoValidator: ValidatorPagamentoStatus,
    private gateway: GatewayPagamentoService,
    private pagamentoRepository: PagamentoRepository,
    private pagamentoMapper: PagamentoMapper,
  ) {}

  async pagar(
    pagamentoDto: PagamentoRequestDto,
    id: number,
    usuarioLogado: UsuarioApi,
  ): Promise<{ message: string }> {
    const diaria = await this.buscarDiariaPorId(id);
    await this.pagamentoValidator.validarClienteDiaria(usuarioLogado, diaria);
    await this.pagamentoValidator.validarStatus(diaria);

    const pagamento = await this.gateway.pagar(diaria, pagamentoDto.cardHash);

    if (pagamento.status === PagamentoStatus.ACEITO) {
      diaria.status = DiariaStatus.PAGO;
      this.diariaRepository.repository.save(diaria);
      return { message: 'Diária paga com sucesso' };
    }

    throw new BadRequestException('Pagamento Recusado');
  }

  private async buscarDiariaPorId(id: number) {
    const diaria = await this.diariaRepository.repository.findOneBy({ id: id });

    if (!diaria) {
      throw new NotFoundException('Diária não encontrada');
    }

    return diaria;
  }

  async listarPagamentoPorUsuarioLogado(
    usuarioLogado: UsuarioApi,
  ): Promise<PagamentoResponseDto[]> {
    const pagamentos =
      await this.pagamentoRepository.repository.findPagamentosPorUsuarioLogado(
        usuarioLogado,
      );
    return pagamentos.map((pagamento) =>
      this.pagamentoMapper.toResponse(pagamento),
    );
  }
}
