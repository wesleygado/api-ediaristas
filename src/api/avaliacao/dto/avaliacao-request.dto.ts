import { IsNotEmpty, IsPositive, Length, Max, Min } from 'class-validator';

export class AvaliacaoRequestDto {
  @IsNotEmpty()
  @Length(3, 255)
  descricao: string;

  @IsNotEmpty()
  @Max(5)
  @IsPositive()
  nota: number;
}
