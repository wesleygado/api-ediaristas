import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ClienteResponseDto } from 'src/clientes/dto/cliente-response.dto';
import { UsuarioApi } from 'src/usuarios/entities/usuario.entity';

export class DiariaRequestDto {
  @IsNotEmpty()
  @Expose({ name: 'data_atendimento' })
  dataAtendimento: Date;

  @IsNotEmpty()
  @Expose({ name: 'tempo_atendimento' })
  tempoAtendimento: number;

  @IsNotEmpty()
  preco: number;

  @IsNotEmpty()
  @MaxLength(60, { message: 'Logradouro deve possuir menos de 60 caracteres' })
  logradouro: string;

  @IsNotEmpty()
  @MaxLength(60, { message: 'Logradouro deve possuir menos de 60 caracteres' })
  numero: number;

  @IsNotEmpty()
  bairro: string;

  @IsOptional()
  complemento: string;

  @IsNotEmpty()
  cidade: string;

  @IsNotEmpty()
  estado: string;

  @IsNotEmpty()
  cep: string;

  @IsNotEmpty()
  @Expose({ name: 'quantidade_quartos' })
  quantidadeQuartos: number;

  @IsNotEmpty()
  @Expose({ name: 'quantidade_salas' })
  quantidadeSalas: number;

  @IsNotEmpty()
  @Expose({ name: 'quantidade_cozinhas' })
  quantidadeCozinhas: number;

  @IsNotEmpty()
  @Expose({ name: 'quantidade_banheiros' })
  quantidadeBanheiros: number;

  @IsNotEmpty()
  @Expose({ name: 'quantidade_quintais' })
  quantidadeQuintais: number;

  @IsNotEmpty()
  @Expose({ name: 'quantidade_outros' })
  quantidadeOutros: number;

  @IsOptional()
  observacoes: string;

  @IsNotEmpty()
  servico: number;

  @Expose({ name: 'codigo_ibge' })
  codigoIbge: string;

  @Exclude()
  valorComissao: number;

  @Exclude()
  cliente: UsuarioApi;

  @Exclude()
  status: number;
}
