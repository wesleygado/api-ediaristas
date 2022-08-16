import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Foto } from './entities/foto.entity';

export class FotoRepository {
  constructor(
    @InjectRepository(Foto)
    private fotoRepository: Repository<Foto>,
  ) {}
  repository = this.fotoRepository.extend({
    async createFoto(file: Foto): Promise<Foto> {
      const { fileName, contentLength, contentType, url } = file;
      const foto = this.create({
        fileName,
        contentLength,
        contentType,
        url,
      });
      await this.save(foto);
      return foto;
    },
  });
}
