import { Module } from '@nestjs/common';
import { CandidaturaService } from './candidatura.service';
import { CandidaturaController } from './candidatura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from 'src/diarias/diaria.repository';
import { ValidatorConstraint } from 'class-validator';
import { ValidatorCandidatura } from 'src/core/validators/candidatura/validator-candidatura';

@Module({
  imports: [TypeOrmModule.forFeature([DiariaRepository])],
  controllers: [CandidaturaController],
  providers: [CandidaturaService, ValidatorCandidatura],
})
export class CandidaturaModule {}
