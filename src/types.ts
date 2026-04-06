export type Currency = 'EUR' | 'USD' | 'USDC' | 'USDT' | 'BTC';
export type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY';
export type OracleType = 'MANUAL' | 'API' | 'CHAINLINK';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// ── Agents ────────────────────────────────────────

export interface RegisterAgentParams {
  name: string;
  ownerName: string;
  ownerEmail: string;
  description?: string;
  dailyLimit?: number;
  webhookUrl?: string;
}

export interface RegisterAgentResult {
  agent: {
    id: string;
    name: string;
    description: string | null;
    ownerName: string;
    ownerEmail: string;
    status: string;
    createdAt: string;
  };
  wallet: {
    id: string;
    dailyLimit: string;
    blockchainAddress: string;
    network: string;
  };
  apiKey: string;
  warning: string;
  onboarding: Record<string, any>;
}

export interface AgentProfile {
  id: string;
  name: string;
  description: string | null;
  ownerName: string;
  ownerEmail: string;
  status: string;
  rateLimit: number;
  walletId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reputation {
  agentId: string;
  score: number;
  tier: string;
  totalTransactions: number;
  successRate: number;
}

// ── Payments ──────────────────────────────────────

export interface SendPaymentParams {
  toAgentId: string;
  amount: number;
  currency: Currency;
  reason?: string;
  metadata?: Record<string, unknown>;
}

export interface TransactionLimits {
  agentId: string;
  tier: string;
  score: number;
  maxPerTransaction: number;
  allTiers: { tier: string; maxPerTransaction: number }[];
  howToIncrease: string;
}

// ── Wallets ───────────────────────────────────────

export interface WalletBalance {
  walletId: string;
  balances: Record<Currency, string>;
}

export interface BlockchainWallet {
  address: string;
  network: string;
  balanceUSDC: string;
  balanceETH: string;
}

export interface WithdrawParams {
  toAddress: string;
  amount: number;
  currency?: string;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

// ── Messaging ─────────────────────────────────────

export interface SendMessageParams {
  recipientId: string;
  subject: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export interface InboxParams extends PaginationParams {
  unreadOnly?: boolean;
  type?: string;
}

// ── Negotiations ──────────────────────────────────

export interface StartNegotiationParams {
  counterpartyId: string;
  subject: string;
  offer: Record<string, unknown>;
  relatedEntityType?: string;
  relatedEntityId?: string;
  expiresInHours?: number;
}

export interface CounterOfferParams {
  offer: Record<string, unknown>;
}

// ── Lending ───────────────────────────────────────

export interface CreateLoanOfferParams {
  amount: number;
  currency: Currency;
  interestRate: number;
  durationDays: number;
  collateralPercent: number;
  expiresInHours?: number;
}

export interface BorrowParams {
  offerId: string;
}

export interface RepayParams {
  amount: number;
}

export interface LoanOffersQuery {
  currency?: Currency;
  limit?: number;
}

// ── Betting ───────────────────────────────────────

export interface CreateBetParams {
  description: string;
  condition: string;
  amount: number;
  currency: Currency;
  oracleType?: OracleType;
  expiresInHours?: number;
}

export interface OpenBetsQuery {
  currency?: Currency;
  limit?: number;
}

// ── Contracts ─────────────────────────────────────

export interface ContractCondition {
  id: string;
  type: string;
  description: string;
  params?: Record<string, unknown>;
}

export interface CreateContractParams {
  counterpartyId: string;
  title: string;
  description: string;
  escrowAmount: number;
  currency: Currency;
  conditions: ContractCondition[];
  deadlineDays?: number;
}

export interface FulfillConditionParams {
  conditionId: string;
}

// ── Subscriptions ─────────────────────────────────

export interface CreateSubscriptionParams {
  recipientId: string;
  amount: number;
  currency: Currency;
  frequency: Frequency;
}

// ── Services & Commerce ───────────────────────────

export interface DiscoverServicesQuery {
  category?: string;
  currency?: Currency;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
}

export interface RequestQuoteParams {
  serviceId: string;
  currency?: Currency;
  nights?: number;
  guests?: number;
  hours?: number;
}

export interface BookParams {
  quoteId: string;
  rail?: string;
}

// ── x402 ──────────────────────────────────────────

export interface X402PayParams {
  url: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: string;
}

// ── Security ──────────────────────────────────────

export interface BlockAgentParams {
  agentId: string;
  reason?: string;
}
