import { SerializeOptions } from '@nestjs/common';
import { Expose, Transform } from 'class-transformer';

export class PagarMeTransacaoRequest {
  @Expose({ name: 'api_key' })
  apiKey: string;

  amount: number;

  @Expose({ name: 'card_hash' })
  cardHash: string;

  async: boolean;
}
