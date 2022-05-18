import { Exclude, Expose } from 'class-transformer';

export class ServicoResponseDto {
  id: number;
  @Expose({ name: 'nome' })
  name: string;

  @Expose({ name: 'valor_minimo' })
  valor_minimo: number;

  @Expose({ name: 'qtd_horas' })
  quantidade_horas: number;

  @Expose({ name: 'porcentagem_comissao' })
  porcentagem: number;

  @Expose({ name: 'valor_quarto' })
  valorQuarto: number;

  @Expose({ name: 'horas_quarto' })
  horasQuarto: number;

  @Expose({ name: 'valor_sala' })
  valorSala: number;

  @Expose({ name: 'valor_sala' })
  horasSala: number;

  @Expose({ name: 'valor_banheiro' })
  valorBanheiro: number;

  @Expose({ name: 'horas_banheiro' })
  horasBanheiro: number;

  @Expose({ name: 'valor_cozinha' })
  valorCozinha: number;

  @Expose({ name: 'horas_cozinha' })
  horasCozinha: number;

  @Expose({ name: 'valor_quintal' })
  valorQuintal: number;

  @Expose({ name: 'horas_quintal' })
  horasQuintal: number;

  @Expose({ name: 'valor_outros' })
  valorOutros: number;

  @Expose({ name: 'horas_outros' })
  horasOutros: number;

  icone: string;
  posicao: number;
}
