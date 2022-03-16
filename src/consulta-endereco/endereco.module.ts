import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller';
import { ViaCepService } from './providers/viaCep.service';
import { EnderecoMapper } from './endereco.mapper';

@Module({
  controllers: [EnderecoController],
  providers: [ViaCepService, EnderecoMapper],
})
export class EnderecoModule {}
