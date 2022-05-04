import { IsNotEmpty, IsOptional, Length, MaxLength } from 'class-validator';

export class EnderecoDiaristaRequestDto {
  @IsNotEmpty()
  @Length(3, 60)
  logradouro: string;

  @IsNotEmpty()
  @Length(1, 10)
  numero: string;

  @IsNotEmpty()
  @Length(3, 30)
  bairro: string;

  @IsOptional()
  @MaxLength(255)
  complemento: string;

  @IsNotEmpty()
  @Length(10, 20)
  cep: string;

  @IsNotEmpty()
  @Length(3, 8)
  cidade: string;

  @IsNotEmpty()
  @Length(2, 2)
  estadp: string;
}
