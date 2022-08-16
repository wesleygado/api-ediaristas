import { Module } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { ServicoMapper } from './servico.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoRepository } from './servico.repository';
import { Servico } from './entities/services.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servico])],
  controllers: [ServicoController],
  providers: [ServicoService, ServicoMapper, ServicoRepository],
})
export class ServicoModule {}
