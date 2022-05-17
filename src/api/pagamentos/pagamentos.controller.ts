import { Controller, Post, Body, Param } from '@nestjs/common';
import { PagamentoRequestDto } from './dto/paramento-request.dto';
import { PagamentosService } from './pagamentos.service';

@Controller('api/diarias')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Post(':id/pagar')
  pagar(
    @Body() pagamentoRequestDto: PagamentoRequestDto,
    @Param('id') id: number,
  ) {
    return this.pagamentosService.pagar(pagamentoRequestDto, id);
  }
}
