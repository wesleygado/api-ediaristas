import { Module } from '@nestjs/common';
import { CandidaturaService } from './candidatura.service';
import { CandidaturaController } from './candidatura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from 'src/api/diarias/diaria.repository';
import { ValidatorCandidatura } from 'src/core/validators/candidatura/validator-candidatura';
import { Diaria } from '../diarias/entities/diaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diaria])],
  controllers: [CandidaturaController],
  providers: [DiariaRepository, CandidaturaService, ValidatorCandidatura],
})
export class CandidaturaModule {}
