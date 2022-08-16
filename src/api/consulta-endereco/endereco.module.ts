import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller';
import { EnderecoMapper } from './endereco.mapper';
import { EnderecoService } from './adapters/endereco.service.interface';
import { IbgeService } from 'src/core/services/consulta-cidade/consulta-cidade.service';
import { ViaCepService } from 'src/core/services/via-cep.service';

@Module({
  controllers: [EnderecoController],
  providers: [ViaCepService, EnderecoService, EnderecoMapper, IbgeService],
})
export class EnderecoModule {}
