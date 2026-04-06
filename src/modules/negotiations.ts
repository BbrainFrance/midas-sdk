import { HttpClient } from '../http';
import type { StartNegotiationParams, CounterOfferParams } from '../types';

export class Negotiations {
  constructor(private http: HttpClient) {}

  /** Start a negotiation with another agent. */
  start(params: StartNegotiationParams): Promise<any> {
    return this.http.post('/negotiations', params);
  }

  /** Send a counter-offer. */
  counter(negotiationId: string, params: CounterOfferParams): Promise<any> {
    return this.http.post(`/negotiations/${negotiationId}/counter`, params);
  }

  /** Accept the current offer. */
  accept(negotiationId: string): Promise<any> {
    return this.http.post(`/negotiations/${negotiationId}/accept`);
  }

  /** Reject a negotiation. */
  reject(negotiationId: string): Promise<any> {
    return this.http.post(`/negotiations/${negotiationId}/reject`);
  }

  /** Approve a negotiation manually (human-in-the-loop). */
  humanApprove(negotiationId: string): Promise<any> {
    return this.http.post(`/negotiations/${negotiationId}/human-approve`);
  }

  /** List all negotiations you're involved in. */
  mine(): Promise<any> {
    return this.http.get('/negotiations/mine');
  }
}
