import { Module } from '@nestjs/common';
import { CandidaturaService } from './candidatura.service';
import { CandidaturaController } from './candidatura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from 'src/diarias/diaria.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiariaRepository])],
  controllers: [CandidaturaController],
  providers: [CandidaturaService],
})
export class CandidaturaModule {}
