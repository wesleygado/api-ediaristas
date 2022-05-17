import { Module } from '@nestjs/common';
import { EnderecoDiaristaService } from './endereco-diarista.service';
import { EnderecoDiaristaController } from './endereco-diarista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from 'src/api/usuarios/usuario.repository';
import { EnderecoDiaristaMapper } from './endereco-diarista.mapper';
import { EnderecoDiaristaRepository } from './endereco-diarista.repository';
import { IbgeService } from 'src/core/services/consulta-cidade/consulta-cidade.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository]),
    TypeOrmModule.forFeature([EnderecoDiaristaRepository]),
  ],
  controllers: [EnderecoDiaristaController],
  providers: [EnderecoDiaristaService, EnderecoDiaristaMapper, IbgeService],
})
export class EnderecoDiaristaModule {}
