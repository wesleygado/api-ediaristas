import { Module } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { PagamentosController } from './pagamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { ValidatorPagamentoStatus } from 'src/core/validators/pagamento/validator-pagamento';
import { PagarMeService } from 'src/core/services/getaway-pagamento/providers/pagarme.service';
import { PagamentoRepository } from './pagamento.repository';
import { GatewayPagamentoService } from 'src/core/services/getaway-pagamento/adapters/gateway-pagamento.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiariaRepository]),
    TypeOrmModule.forFeature([PagamentoRepository]),
  ],
  controllers: [PagamentosController],
  providers: [
    PagamentosService,
    ValidatorPagamentoStatus,
    {
      provide: GatewayPagamentoService,
      useClass: PagarMeService,
    },
  ],
})
export class PagamentosModule {}
