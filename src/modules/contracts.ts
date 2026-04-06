import { HttpClient } from '../http';
import type { CreateContractParams, FulfillConditionParams } from '../types';

export class Contracts {
  constructor(private http: HttpClient) {}

  /** Create a conditional contract with escrow. */
  create(params: CreateContractParams): Promise<any> {
    return this.http.post('/contracts', params);
  }

  /** Sign a contract as counterparty to activate it. */
  sign(contractId: string): Promise<any> {
    return this.http.post(`/contracts/${contractId}/sign`);
  }

  /** Mark a condition as fulfilled. */
  fulfill(contractId: string, params: FulfillConditionParams): Promise<any> {
    return this.http.post(`/contracts/${contractId}/fulfill`, params);
  }

  /** View all contracts you're party to. */
  mine(): Promise<any> {
    return this.http.get('/contracts/mine');
  }
}
