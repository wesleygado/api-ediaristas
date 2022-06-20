import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { ClienteResponseDto } from 'src/api/clientes/dto/cliente-response.dto';
import { HateoasLinks } from 'src/core/hateoas/hateoas.interface';
import { DiaristaDiariaResponseDto } from 'src/api/diaristas/dtos/diarista-diaria.dto';
import { AvaliacaoResponseDto } from 'src/api/avaliacao/dto/avaliacao-response.dto';

export class DiariaResponseDto {
  id: number;

  status: number;

  @Expose({ name: 'codigo_ibge' })
  codigoIbge: string;

  @Expose({ name: 'valor_comissao' })
  valorComissao: number;

  @Expose({ name: 'motivo_cancelamento' })
  motivoCancelamento: string;

  @Expose({ name: 'nome_servico' })
  nomeServico: string;

  complemento: string;

  @Expose({ name: 'data_atendimento' })
  dataAtendimento: Date;

  @Expose({ name: 'tempo_atendimento' })
  tempoAtendimento: number;

  preco: number;

  logradouro: string;

  numero: number;

  bairro: string;

  cidade: string;

  estado: string;

  @Expose({ name: 'quantidade_quartos' })
  quantidadeQuartos: number;

  @Expose({ name: 'quantidade_salas' })
  quantidadeSalas: number;

  @Expose({ name: 'quantidade_cozinhas' })
  quantidadeCozinhas: number;

  @Expose({ name: 'quantidade_banheiros' })
  quantidadeBanheiros: number;

  @Expose({ name: 'quantidade_quintais' })
  quantidadeQuintais: number;

  @Expose({ name: 'quantidade_outros' })
  quantidadeOutros: number;

  observacoes: string;

  servico: number;

  created_at: Date;

  updated_at: Date;

  cliente: ClienteResponseDto;

  @IsOptional()
  diarista: DiaristaDiariaResponseDto;

  links?: HateoasLinks[];

  avaliacao: AvaliacaoResponseDto[];
}
