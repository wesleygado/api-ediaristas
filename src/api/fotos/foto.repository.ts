import { EntityRepository, Repository } from 'typeorm';
import { Foto } from './entities/foto.entity';

@EntityRepository(Foto)
export class FotoRepository extends Repository<Foto> {
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
  }
}
