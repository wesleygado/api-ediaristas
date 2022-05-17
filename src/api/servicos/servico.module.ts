import { Module } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { ServicoMapper } from './servico.mapper';

@Module({
  controllers: [ServicoController],
  providers: [ServicoService, ServicoMapper],
})
export class ServicoModule {}
