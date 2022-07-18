import { Injectable } from '@nestjs/common';
import { Foto } from './entities/foto.entity';
import { FotoRepository } from './foto.repository';
import { Request } from 'express';

@Injectable()
export class FotoService {
  constructor(private fotoRepository: FotoRepository) {}

  async salvar(file: Express.Multer.File, req: Request): Promise<Foto> {
    const foto = new Foto();
    foto.fileName = file.filename;
    foto.contentLength = file.size;
    foto.contentType = file.mimetype;
    foto.url = `${req.protocol}://${req.get('host')}/images/${file.filename}`;

    return await this.fotoRepository.createFoto(foto);
  }

  async deletar(fotoId: number) {
    return await this.fotoRepository.delete({ id: fotoId });
  }
}
