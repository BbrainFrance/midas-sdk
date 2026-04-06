import { HttpClient } from '../http';
import type { RegisterAgentParams, RegisterAgentResult, AgentProfile, Reputation } from '../types';

export class Agents {
  constructor(private http: HttpClient) {}

  /** Register a new agent (no auth required — use a temporary client). */
  register(params: RegisterAgentParams): Promise<RegisterAgentResult> {
    return this.http.post('/agents/register', params);
  }

  /** Get the authenticated agent's profile. */
  me(): Promise<AgentProfile> {
    return this.http.get('/agents/me');
  }

  /** Set or clear the webhook URL for real-time notifications. */
  setWebhook(webhookUrl: string | null): Promise<{ agentId: string; webhookUrl: string | null }> {
    return this.http.put('/agents/me/webhook', { webhookUrl });
  }

  /** Get any agent's reputation score by ID. */
  reputation(agentId: string): Promise<Reputation> {
    return this.http.get(`/agents/${agentId}/reputation`);
  }
}
