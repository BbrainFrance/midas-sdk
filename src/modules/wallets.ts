import { HttpClient } from '../http';
import type { WalletBalance, BlockchainWallet, WithdrawParams, PaginationParams } from '../types';

export class Wallets {
  constructor(private http: HttpClient) {}

  /** Get wallet balances across all currencies. */
  balance(): Promise<WalletBalance> {
    return this.http.get('/wallets/balance');
  }

  /** Get transaction history. */
  history(params?: PaginationParams): Promise<any> {
    return this.http.get('/wallets/history', params as Record<string, unknown> | undefined);
  }

  /** Get blockchain wallet info (Base L2 address, on-chain balances). */
  blockchain(): Promise<BlockchainWallet> {
    return this.http.get('/wallets/blockchain');
  }

  /** Withdraw USDC to an external Base network address. */
  withdraw(params: WithdrawParams): Promise<any> {
    return this.http.post('/wallets/withdraw', params);
  }
}
