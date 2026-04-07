import { HttpClient } from '../http';
import type { SendPaymentParams, TransactionLimits, OnchainPaymentResult, Currency } from '../types';

export class Payments {
  constructor(private http: HttpClient) {}

  /** Send a payment to another agent (internal ledger by default). */
  send(params: SendPaymentParams): Promise<any> {
    return this.http.post('/payments/send', params);
  }

  /**
   * Send an on-chain USDC payment via Circle Paymaster.
   * Gas is paid in USDC — no ETH needed.
   */
  sendOnchain(params: { toAgentId: string; amount: number; reason?: string; metadata?: Record<string, unknown> }): Promise<OnchainPaymentResult> {
    return this.http.post('/payments/send', {
      ...params,
      currency: 'USDC' as Currency,
      paymentMethod: 'onchain',
    });
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
