import { HttpClient } from '../http';
import type { DiscoverServicesQuery, RequestQuoteParams, BookParams } from '../types';

export class Services {
  constructor(private http: HttpClient) {}

  /** Search available services in the marketplace. */
  discover(query?: DiscoverServicesQuery): Promise<any> {
    return this.http.get('/services/discover', query as Record<string, unknown> | undefined);
  }

  /** Get service details by ID. */
  get(serviceId: string): Promise<any> {
    return this.http.get(`/services/${serviceId}`);
  }

  /** Request a price quote for a service. */
  quote(params: RequestQuoteParams): Promise<any> {
    return this.http.post('/quotes', params);
  }

  /** Book a service and pay using a quote. */
  book(params: BookParams): Promise<any> {
    return this.http.post('/bookings', params);
  }
}
