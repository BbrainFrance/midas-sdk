import { HttpClient } from '../http';
import type { X402PayParams } from '../types';

export class X402 {
  constructor(private http: HttpClient) {}

  /** Pay an external service via x402 (HTTP 402). MIDAS handles the USDC settlement. */
  pay(params: X402PayParams): Promise<any> {
    return this.http.post('/x402/pay', params);
  }
}
