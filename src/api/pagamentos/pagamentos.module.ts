import { Module } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { PagamentosController } from './pagamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { ValidatorPagamentoStatus } from 'src/core/validators/pagamento/validator-pagamento';
import { PagarMeService } from 'src/core/services/getaway-pagamento/providers/pagarme.service';
import { PagamentoRepository } from './pagamento.repository';
import { GatewayPagamentoService } from 'src/core/services/getaway-pagamento/adapters/gateway-pagamento.service';
import { PagamentoMapper } from './pagamento.mapper';
import { Diaria } from '../diarias/entities/diaria.entity';
import { Pagamento } from './entities/pagamento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diaria]),
    TypeOrmModule.forFeature([Pagamento]),
  ],
  controllers: [PagamentosController],
  providers: [
    PagamentoRepository,
    DiariaRepository,
    PagamentosService,
    ValidatorPagamentoStatus,
    PagamentoMapper,
    {
      provide: GatewayPagamentoService,
      useClass: PagarMeService,
    },
  ],
})
export class PagamentosModule {}
