import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller';
import { EnderecoMapper } from './endereco.mapper';
import { EnderecoService } from './adapters/endereco.service.interface';
import { ViaCepService } from '../../providers/via-cep.service';
import { IbgeService } from 'src/core/services/consulta-cidade/consulta-cidade.service';

@Module({
  controllers: [EnderecoController],
  providers: [ViaCepService, EnderecoService, EnderecoMapper, IbgeService],
})
export class EnderecoModule {}
