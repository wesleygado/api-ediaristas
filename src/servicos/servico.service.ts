import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { ServicoResponseDto } from './dto/servicoResponse.dto';
import { ServicoMapper } from './servico.mapper';

@Injectable()
export class ServicoService {
  constructor(
    private readonly manager: EntityManager,
    private readonly servicoMapper: ServicoMapper,
  ) {}
  async findAll(): Promise<ServicoResponseDto[]> {
    const servicos = await this.manager.query(
      'Select * from servico ORDER BY posicao ASC',
    );
    return servicos.map((servico) =>
      this.servicoMapper.toServicoResponseDto(servico),
    );
  }
  async buscarServicoPorId(servicoId: number): Promise<ServicoResponseDto> {
    const servico: ServicoResponseDto = await this.manager.query(
      `Select * from servico where id = ${servicoId}`,
    );
    return servico[0];
  }
}
