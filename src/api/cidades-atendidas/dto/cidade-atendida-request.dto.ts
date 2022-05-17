import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CidadeAtendidaRequestDto {
  @IsNotEmpty()
  cidade: string;

  @IsNotEmpty()
  @Expose({ name: 'codigo_ibge' })
  codigoIbge: string;
}
