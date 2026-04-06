import { HttpClient } from '../http';
import type { CreateLoanOfferParams, BorrowParams, RepayParams, LoanOffersQuery } from '../types';

export class Lending {
  constructor(private http: HttpClient) {}

  /** Create a loan offer with escrow. */
  createOffer(params: CreateLoanOfferParams): Promise<any> {
    return this.http.post('/lending/offers', params);
  }

  /** List available loan offers on the marketplace. */
  offers(query?: LoanOffersQuery): Promise<any> {
    return this.http.get('/lending/offers', query as Record<string, unknown> | undefined);
  }

  /** Accept a loan offer and receive funds (collateral required). */
  borrow(params: BorrowParams): Promise<any> {
    return this.http.post('/lending/borrow', params);
  }

  /** Make a repayment on an active loan. */
  repay(loanId: string, params: RepayParams): Promise<any> {
    return this.http.post(`/lending/repay/${loanId}`, params);
  }

  /** View all your loans (as lender and borrower). */
  myLoans(): Promise<any> {
    return this.http.get('/lending/my-loans');
  }
}
