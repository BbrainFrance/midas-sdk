import { HttpClient } from '../http';
import type { SendPaymentParams, TransactionLimits } from '../types';

export class Payments {
  constructor(private http: HttpClient) {}

  /** Send a payment to another agent. */
  send(params: SendPaymentParams): Promise<any> {
    return this.http.post('/payments/send', params);
  }

  /** Get payment details by ID. */
  get(paymentId: string): Promise<any> {
    return this.http.get(`/payments/${paymentId}`);
  }

  /** Check your reputation-based transaction limits. */
  myLimits(): Promise<TransactionLimits> {
    return this.http.get('/payments/my-limits');
  }
}
