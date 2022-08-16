import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foto } from './entities/foto.entity';
import { FotoRepository } from './foto.repository';
import { FotoService } from './foto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Foto])],
  providers: [FotoService, FotoRepository],
})
export class FotoModule {}
