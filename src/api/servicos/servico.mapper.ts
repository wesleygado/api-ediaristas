import { Injectable } from '@nestjs/common';
import { ServicoResponseDto } from './dto/servicoResponse.dto';
import { Servico } from './entities/services.entity';

@Injectable()
export class ServicoMapper {
  toServicoResponseDto(servico: Servico): ServicoResponseDto {
    console.log(servico.valorSala);
    const servicoDTO = new ServicoResponseDto();
    servicoDTO.id = servico.id;
    servicoDTO.name = servico.name;
    servicoDTO.valor_minimo = servico.valorMinimo / 100;
    servicoDTO.quantidade_horas = servico.quantidadeHoras;
    servicoDTO.porcentagem = servico.porcentagem;
    servicoDTO.valorQuarto = servico.valorQuarto / 100;
    servicoDTO.horasQuarto = servico.horasQuarto;
    servicoDTO.valorSala = servico.valorSala / 100;
    servicoDTO.horasSala = servico.horasSala;
    servicoDTO.valorBanheiro = servico.valorBanheiro / 100;
    servicoDTO.horasBanheiro = servico.horasBanheiro;
    servicoDTO.valorCozinha = servico.valorCozinha / 100;
    servicoDTO.horasCozinha = servico.horasCozinha;
    servicoDTO.valorQuintal = servico.valorQuintal / 100;
    servicoDTO.horasQuintal = servico.horasQuintal;
    servicoDTO.valorOutros = servico.valorOutros / 100;
    servicoDTO.horasOutros = servico.horasOutros;
    servicoDTO.icone = servico.icone;
    servicoDTO.posicao = servico.posicao;
    return servicoDTO;
  }
}
