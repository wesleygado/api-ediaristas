import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FotoRepository } from './foto.repository';
import { FotoService } from './foto.service';

@Module({
  imports: [TypeOrmModule.forFeature([FotoRepository])],
  providers: [FotoService],
})
export class FotoModule {}
