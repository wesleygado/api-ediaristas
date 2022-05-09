import { EntityRepository, Repository } from 'typeorm';
import { EnderecoDiaristaRequestDto } from './dto/endereco-diarista-request.dto';
import { EnderecoDiarista } from './entities/endereco-diarista.entity';

@EntityRepository(EnderecoDiarista)
export class EnderecoDiaristaRepository extends Repository<EnderecoDiarista> {
  async createUser(
    enderecoDiaristaRequestoDto: EnderecoDiaristaRequestDto,
  ): Promise<EnderecoDiarista> {
    const { logradouro, bairro, cep, cidade, complemento, numero, estado, id } =
      enderecoDiaristaRequestoDto;
    const endereco = this.create({
      id,
      logradouro,
      bairro,
      cep,
      cidade,
      complemento,
      numero,
      estado,
    });
    await this.save(endereco);
    return endereco;
  }
}
