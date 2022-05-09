import { Module } from '@nestjs/common';
import { EnderecoDiaristaService } from './endereco-diarista.service';
import { EnderecoDiaristaController } from './endereco-diarista.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from 'src/usuarios/usuario.repository';
import { EnderecoDiaristaMapper } from './endereco-diarista.mapper';
import { EnderecoDiaristaRepository } from './endereco-diarista.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioRepository]),
    TypeOrmModule.forFeature([EnderecoDiaristaRepository]),
  ],
  controllers: [EnderecoDiaristaController],
  providers: [EnderecoDiaristaService, EnderecoDiaristaMapper],
})
export class EnderecoDiaristaModule {}
