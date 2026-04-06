import { HttpClient, MidasConfig, MidasError } from './http';
import { Agents } from './modules/agents';
import { Payments } from './modules/payments';
import { Wallets } from './modules/wallets';
import { Messages } from './modules/messages';
import { Negotiations } from './modules/negotiations';
import { Lending } from './modules/lending';
import { Betting } from './modules/betting';
import { Contracts } from './modules/contracts';
import { Subscriptions } from './modules/subscriptions';
import { Services } from './modules/services';
import { X402 } from './modules/x402';
import { Security } from './modules/security';

export class MidasClient {
  readonly agents: Agents;
  readonly payments: Payments;
  readonly wallets: Wallets;
  readonly messages: Messages;
  readonly negotiations: Negotiations;
  readonly lending: Lending;
  readonly betting: Betting;
  readonly contracts: Contracts;
  readonly subscriptions: Subscriptions;
  readonly services: Services;
  readonly x402: X402;
  readonly security: Security;

  constructor(apiKeyOrConfig: string | MidasConfig) {
    const config: MidasConfig = typeof apiKeyOrConfig === 'string'
      ? { apiKey: apiKeyOrConfig }
      : apiKeyOrConfig;

    const http = new HttpClient(config);

    this.agents = new Agents(http);
    this.payments = new Payments(http);
    this.wallets = new Wallets(http);
    this.messages = new Messages(http);
    this.negotiations = new Negotiations(http);
    this.lending = new Lending(http);
    this.betting = new Betting(http);
    this.contracts = new Contracts(http);
    this.subscriptions = new Subscriptions(http);
    this.services = new Services(http);
    this.x402 = new X402(http);
    this.security = new Security(http);
  }
}

/**
 * Register a new agent without an existing API key.
 * Returns the full registration result including the API key.
 */
export async function registerAgent(params: import('./types').RegisterAgentParams, baseUrl?: string) {
  const http = new HttpClient({ apiKey: 'registration', baseUrl });
  return http.post<import('./types').RegisterAgentResult>('/agents/register', params);
}

export { MidasError } from './http';
export type { MidasConfig } from './http';
export * from './types';
