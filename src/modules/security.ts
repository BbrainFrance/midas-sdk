import { HttpClient } from '../http';
import type { BlockAgentParams } from '../types';

export class Security {
  constructor(private http: HttpClient) {}

  /** Block another agent. */
  block(params: BlockAgentParams): Promise<any> {
    return this.http.post('/agents/me/block', params);
  }

  /** Unblock a previously blocked agent. */
  unblock(agentId: string): Promise<any> {
    return this.http.delete(`/agents/me/block/${agentId}`);
  }

  /** List all blocked agents. */
  blocked(): Promise<any> {
    return this.http.get('/agents/me/blocks');
  }
}
