import { HttpClient } from '../http';
import type { CreateSubscriptionParams } from '../types';

export class Subscriptions {
  constructor(private http: HttpClient) {}

  /** Set up a recurring payment to another agent. */
  create(params: CreateSubscriptionParams): Promise<any> {
    return this.http.post('/subscriptions', params);
  }

  /** Cancel a subscription. */
  cancel(subscriptionId: string): Promise<any> {
    return this.http.delete(`/subscriptions/${subscriptionId}`);
  }

  /** View all subscriptions (paying and receiving). */
  mine(): Promise<any> {
    return this.http.get('/subscriptions/mine');
  }
}
