import { Expose } from 'class-transformer';

export class PagarMeReembolsoRequest {
  @Expose({ name: 'api_key' })
  apiKey: string;

  amount: number;
}
