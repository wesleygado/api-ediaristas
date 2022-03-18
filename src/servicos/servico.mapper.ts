import { Injectable } from '@nestjs/common';
import { ServicoResponseDto } from './dto/servicoResponse.dto';

@Injectable()
export class ServicoMapper {
  toServicoResponseDto(servico): ServicoResponseDto {
    const servicoDTO = new ServicoResponseDto();
    servicoDTO.id = servico.id;
    servicoDTO.name = servico.name;
    servicoDTO.valor_minimo = servico.valor_minimo;
    servicoDTO.quantidade_horas = servico.quantidade_horas;
    servicoDTO.porcentagem = servico.porcentagem;
    servicoDTO.valor_quarto = servico.valor_quarto;
    servicoDTO.horas_quarto = servico.horas_quarto;
    servicoDTO.valor_sala = servico.valor_sala;
    servicoDTO.horas_sala = servico.horas_sala;
    servicoDTO.valor_banheiro = servico.valor_banheiro;
    servicoDTO.horas_banheiro = servico.horas_banheiro;
    servicoDTO.valor_cozinha = servico.valor_cozinha;
    servicoDTO.horas_cozinha = servico.horas_cozinha;
    servicoDTO.valor_quintal = servico.valor_quintal;
    servicoDTO.horas_quintal = servico.horas_quintal;
    servicoDTO.valor_outros = servico.valor_outros;
    servicoDTO.horas_outros = servico.horas_outros;
    servicoDTO.icone = servico.icone;
    servicoDTO.posicao = servico.posicao;
    return servicoDTO;
  }
}
