import { HttpModule } from '@nestjs/axios';
import { DiaristaService } from './diarista.service';
import { DiaristaController } from './diarista.controller';
import { DiaristaRepository } from './diarista.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ViaCepService } from 'src/consulta-endereco/providers/via-cep.service';
import { DiaristaMapper } from './diarista.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([DiaristaRepository]), HttpModule],
  controllers: [DiaristaController],
  providers: [DiaristaService, ViaCepService, DiaristaMapper],
})
export class DiaristaModule {}
