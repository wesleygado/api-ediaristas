import { Module } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';
import { PagamentosController } from './pagamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { ValidatorPagamentoStatus } from 'src/core/validators/pagamento/validator-pagamento';

@Module({
  imports: [TypeOrmModule.forFeature([DiariaRepository])],
  controllers: [PagamentosController],
  providers: [PagamentosService, ValidatorPagamentoStatus],
})
export class PagamentosModule {}
