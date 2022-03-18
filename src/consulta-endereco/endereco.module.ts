import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller';
import { EnderecoMapper } from './endereco.mapper';
import { EnderecoService } from './adapters/endereco.service.interface';
import { ViaCepService } from './providers/viaCep.service';

@Module({
  controllers: [EnderecoController],
  providers: [ViaCepService, EnderecoService, EnderecoMapper],
})
export class EnderecoModule {}
