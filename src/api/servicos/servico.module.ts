import { Module } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { ServicoMapper } from './servico.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoRepository } from './servico.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ServicoRepository])],
  controllers: [ServicoController],
  providers: [ServicoService, ServicoMapper],
})
export class ServicoModule {}
