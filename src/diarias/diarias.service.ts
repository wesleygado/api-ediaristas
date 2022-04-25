import { Injectable } from '@nestjs/common';
import { DiariaRepository } from './diaria.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DiariaMapper } from './diariaMapper';
import { DiariaRequestDto } from './dto/diaria-request.dto';
import { Diaria } from './entities/diaria.entity';
import { ServicoService } from 'src/servicos/servico.service';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';
import { ClienteService } from 'src/clientes/cliente.service';
import { ClienteMapper } from 'src/clientes/clienteMapper';
import DiariaStatus from './enum/diaria-status';

@Injectable()
export class DiariasService {
  constructor(
    @InjectRepository(DiariaRepository)
    private diariaRepository: DiariaRepository,
    private diariaMapper: DiariaMapper,
    private servico: ServicoService,
    private cliente: ClienteMapper,
  ) {}

  async cadastrar(request: DiariaRequestDto, userRequest: UsuarioApi) {
    const diariaDTO = this.diariaMapper.toDiariaRequestDto(request);
    diariaDTO.valorComissao = await this.calcularComissao(diariaDTO);
    diariaDTO.cliente = userRequest;
    diariaDTO.status = DiariaStatus.SEM_PAGAMENTO;
    const diariaCadastrada = await this.diariaRepository.createDiaria(
      diariaDTO,
    );
    console.log('ta aqui');
    return this.diariaMapper.toDiariaResponseDto(diariaCadastrada);
  }

  private async calcularComissao(model: DiariaRequestDto): Promise<number> {
    const preco = model.preco;
    const porcentagemComissao = await (
      await this.servico.buscarServicoPorId(model.servico)
    ).porcentagem;
    return (preco * porcentagemComissao) / 100;
  }
}
