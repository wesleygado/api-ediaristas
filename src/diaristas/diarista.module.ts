import { Module } from '@nestjs/common';
import { DiaristaService } from './diarista.service';
import { DiaristaController } from './diarista.controller';
import { DiaristaRepository } from './diaristaRepository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DiaristaRepository])],
  controllers: [DiaristaController],
  providers: [DiaristaService],
})
export class DiaristaModule {}
