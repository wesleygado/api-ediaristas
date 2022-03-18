import { Controller, Get } from '@nestjs/common';
import { ServicoService } from './servico.service';

@Controller('api/servico')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Get()
  findAll() {
    return this.servicoService.findAll();
  }
}
