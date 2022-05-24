import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Servico } from '../servicos/entities/services.entity';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import { Diaria } from './entities/diaria.entity';

@EntityRepository(Diaria)
export class DiariaRepository extends Repository<Diaria> {
  async getDiaria(): Promise<Diaria[]> {
    const query = this.createQueryBuilder('Diaria');
    const diarias = await query.getMany();
    return diarias;
  }

  async createDiaria(
    diariaDto: DiariaRequestDto,
    servico: Servico,
  ): Promise<Diaria> {
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

  async findOportunidades(
    cidades: string[],
    candidato: UsuarioApi,
  ): Promise<Diaria[]> {
    /*     const diaria = await this.createQueryBuilder('diaria')
      .where('diaria.status = 2')
      .andWhere('diaria.diarista IS NULL')
      .andWhere('diaria.codigoIbge IN(:cidades)', { cidades: cidades })
      .leftJoinAndSelect('diaria.candidatos', 'candidatos')
      .andWhere('diaria_candidato.usuario_api_id = 191')
      .getMany(); */

    const diaria = await this.createQueryBuilder('diaria')
      .select('diaria')
      .leftJoinAndSelect('diaria.cliente', 'cliente')
      .leftJoinAndSelect('diaria.candidatos', 'candidatos')
      .andWhere('diaria.diarista IS NULL')
      .andWhere('diaria.codigoIbge IN(:cidades)', { cidades: cidades })
      .andWhere('diaria.status = :status', { status: 2 })
      .getMany();

    return diaria;
  }

  async getAptasParaSelecaoDiarista(): Promise<Diaria[]> {
    let diaria = await this.createQueryBuilder('diaria')
      .select('diaria')
      .where('diaria.status = :status', { status: 2 })
      .andWhere('diaria.diarista IS NULL')
      .innerJoinAndSelect('diaria.candidatos', 'candidatos')
      .leftJoinAndSelect('candidatos.endereco', 'endereco')
      .getMany();

    diaria = diaria.filter((diaria) => {
      const dataAgora = new Date(Date.now());
      const diferencaDatas = new Date(
        dataAgora.getTime() - diaria.created_at.getTime(),
      );
      const diferencaHoras = diferencaDatas.getTime() / 3600000;
      if (diferencaHoras < 24) {
        return diaria;
      }
    });

    diaria = diaria.filter(
      (diaria) =>
        diaria.candidatos.length <= 3 || diaria.candidatos.length >= 0,
    );
    return diaria;
  }
}
