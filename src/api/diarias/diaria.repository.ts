import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioApi } from 'src/api/usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { Servico } from '../servicos/entities/services.entity';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import { Diaria } from './entities/diaria.entity';
import DiariaStatus from './enum/diaria-status';

export class DiariaRepository {
  constructor(
    @InjectRepository(Diaria)
    private diariaRepository: Repository<Diaria>,
  ) {}
  repository = this.diariaRepository.extend({
    async getDiaria(): Promise<Diaria[]> {
      const query = this.createQueryBuilder('Diaria');
      const diarias = await query.getMany();
      return diarias;
    },

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
        valorComissao: valorComissao,
        cliente,
        status,
        codigoIbge,
      });
      await this.save(diaria);
      return diaria;
    },

    async findByCliente(cliente: UsuarioApi): Promise<Diaria[]> {
      return await this.find({
        where: {
          cliente: {
            id: cliente.id,
          },
        },
      });
    },

    async findByDiarista(diarista: UsuarioApi): Promise<Diaria[]> {
      return await this.find({
        where: {
          diarista: {
            id: diarista.id,
          },
        },
      });
    },

    async findOportunidades(
      cidades: string[],
      usuarioLogado: UsuarioApi,
    ): Promise<Diaria[]> {
      const diaria = await this.manager.query(
        `select * from diaria where status = ${DiariaStatus.PAGO} 
        and codigo_ibge in (${cidades}) 
        and (select count(*) 
        from diaria_candidato 
        where diaria.id = diaria_candidato.diaria_id) < 3 
        and not exists (select * from diaria_candidato where diaria.id = diaria_candidato.diaria_id 
        and usuario_api_id = ${usuarioLogado.id})`,
      );

      const ids = diaria.map((diaria) => diaria.id);

      if (ids.length === 0) {
        throw new NotFoundException('Não há diarias dispóniveis');
      }

      const diarias = await this.createQueryBuilder('diaria')
        .select('diaria')
        .leftJoinAndSelect('diaria.cliente', 'cliente')
        .leftJoinAndSelect('diaria.candidatos', 'candidatos')
        .leftJoinAndSelect('diaria.servico', 'servico')
        .where('diaria.id IN(:id)', { id: ids })
        .getMany();

      return diarias;
    },

    async getAptasParaSelecaoDiarista(): Promise<Diaria[]> {
      const diaria = await this.createQueryBuilder('diaria')
        .select('diaria')
        .leftJoinAndSelect('diaria.candidatos', 'candidatos')
        .leftJoinAndSelect('candidatos.endereco', 'endereco')
        .where('diaria.status = :status', { status: DiariaStatus.PAGO })
        .andWhere('diaria.diarista IS NULL')
        .andWhere('usuario_api_id IS NOT NULL')
        .andWhere('diaria.created_at + interval 1 day < now()')
        .getMany();

      return diaria;
    },

    async getAptasParaCancelamento(): Promise<Diaria[]> {
      const diariaSemCandidatoPaga = await this.createQueryBuilder('diaria')
        .select('diaria')
        .leftJoinAndSelect('diaria.candidatos', 'candidatos')
        .where('usuario_api_id IS NULL')
        .andWhere('diaria.status = :status', { status: DiariaStatus.PAGO })
        .andWhere('diaria.data_atendimento - interval 1 day < now()')
        .getMany();

      const diariaSemCandidatoSemPagamento = await this.createQueryBuilder(
        'diaria',
      )
        .select('diaria')
        .leftJoinAndSelect('diaria.candidatos', 'candidatos')
        .where('usuario_api_id IS NULL')
        .andWhere('diaria.status = :status', {
          status: DiariaStatus.SEM_PAGAMENTO,
        })
        .andWhere('diaria.created_at + interval 1 day < now()')
        .getMany();

      const diarias = diariaSemCandidatoPaga.concat(
        diariaSemCandidatoSemPagamento,
      );

      return diarias;
    },
  });
}
