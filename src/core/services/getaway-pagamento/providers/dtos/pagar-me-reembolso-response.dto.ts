import { Expose } from 'class-transformer';

export class PagarMeReembolsoResponse {
  id: string;
  status: string;
  amount: number;
  @Expose({ name: 'refunded_amount' })
  refundedAmount: number;
}
