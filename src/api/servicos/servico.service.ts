import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicoResponseDto } from './dto/servicoResponse.dto';
import { ServicoMapper } from './servico.mapper';
import { ServicoRepository } from './servico.repository';

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(ServicoRepository)
    private readonly servicoRepository: ServicoRepository,
    private readonly servicoMapper: ServicoMapper,
  ) {}
  async findAll(): Promise<ServicoResponseDto[]> {
    const servicos = await this.servicoRepository.getServicos();

    return servicos.map((servico) =>
      this.servicoMapper.toServicoResponseDto(servico),
    );
  }
  async buscarServicoPorId(id: number): Promise<ServicoResponseDto> {
    const servico = await this.servicoRepository.findOne(id);

    return this.servicoMapper.toServicoResponseDto(servico);
  }
}
