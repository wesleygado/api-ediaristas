import { Exclude, Expose } from 'class-transformer';

export class ServicoResponseDto {
  id: number;
  @Expose({ name: 'nome' })
  name: string;

  valor_minimo: number;

  @Expose({ name: 'qtd_horas' })
  quantidade_horas: number;

  @Expose({ name: 'porcentagem_comissao' })
  porcentagem: number;
  valor_quarto: number;
  horas_quarto: number;
  valor_sala: number;
  horas_sala: number;
  valor_banheiro: number;
  horas_banheiro: number;
  valor_cozinha: number;
  horas_cozinha: number;
  valor_quintal: number;
  horas_quintal: number;
  valor_outros: number;
  horas_outros: number;
  icone: string;
  posicao: number;
}
