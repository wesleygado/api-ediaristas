import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';
import { EntityRepository, Repository } from 'typeorm';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import { Diaria } from './entities/diaria.entity';

@EntityRepository(Diaria)
export class DiariaRepository extends Repository<Diaria> {
  async getDiaria(): Promise<Diaria[]> {
    const query = this.createQueryBuilder('Diaria');
    const diarias = await query.getMany();
    return diarias;
  }

  async createDiaria(diariaDto: DiariaRequestDto): Promise<Diaria> {
    const {
      dataAtendimento,
      tempoAtendimento,
      preco,
      logradouro,
      numero,
      bairro,
      complemento,
      cidade,
      estado,
      cep,
      quantidadeBanheiros,
      quantidadeCozinhas,
      quantidadeOutros,
      quantidadeQuartos,
      quantidadeQuintais,
      quantidadeSalas,
      observacoes,
      servico,
      valorComissao,
      cliente,
      status,
      codigoIbge,
    } = diariaDto;
    const diaria = this.create({
      localDateTime: dataAtendimento,
      tempoAtendimento,
      preco,
      logradouro,
      numero,
      bairro,
      complemento,
      cidade,
      estado,
      cep,
      quantidadeBanheiros,
      quantidadeCozinhas,
      quantidadeOutros,
      quantidadeQuartos,
      quantidadeQuintais,
      quantidadeSalas,
      observacoes,
      servico,
      valorComissao: valorComissao,
      cliente,
      status,
      codigoIbge,
    });
    await this.save(diaria);
    return diaria;
  }

  async findByCliente(cliente: UsuarioApi): Promise<Diaria[]> {
    return await this.find({ cliente: cliente });
  }

  async findByDiarista(diarista: UsuarioApi): Promise<Diaria[]> {
    return await this.find({ diarista: diarista });
  }
}
