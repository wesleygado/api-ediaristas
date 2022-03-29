import { Injectable } from '@nestjs/common';
import { Foto } from './entities/foto.entity';
import { FotoRepository } from './foto.repository';

@Injectable()
export class FotoService {
  constructor(private fotoRepository: FotoRepository) {}

  async salvar(file: Express.Multer.File): Promise<Foto> {
    const foto = new Foto();
    foto.fileName = file.filename;
    foto.contentLength = file.size;
    foto.contentType = file.mimetype;
    foto.url = file.path;

    return await this.fotoRepository.createFoto(foto);
  }
}
