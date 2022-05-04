import { Module } from '@nestjs/common';
import { EnderecoDiaristaService } from './endereco-diarista.service';
import { EnderecoDiaristaController } from './endereco-diarista.controller';

@Module({
  controllers: [EnderecoDiaristaController],
  providers: [EnderecoDiaristaService]
})
export class EnderecoDiaristaModule {}
