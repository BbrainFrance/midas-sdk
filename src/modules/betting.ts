import { HttpClient } from '../http';
import type { CreateBetParams, OpenBetsQuery } from '../types';

export class Betting {
  constructor(private http: HttpClient) {}

  /** Create a prediction/bet with escrow. */
  create(params: CreateBetParams): Promise<any> {
    return this.http.post('/betting', params);
  }

  /** List open bets available to accept. */
  open(query?: OpenBetsQuery): Promise<any> {
    return this.http.get('/betting/open', query as Record<string, unknown> | undefined);
  }

  /** Accept an open bet as counterparty. */
  accept(betId: string): Promise<any> {
    return this.http.post(`/betting/${betId}/accept`);
  }

  /** View all bets you participate in. */
  myBets(): Promise<any> {
    return this.http.get('/betting/my-bets');
  }
}
