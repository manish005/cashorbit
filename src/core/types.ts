export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
  type: TransactionType;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
}

export interface UserProfile {
  name: string;
  email: string;
  currency: string;
  tier?: 'basic' | 'premium';
}

export interface CategoryResult {
  name: string;
  value: number;
  color: string;
}

export interface MonthlyData {
  name: string;
  income: number;
  expense: number;
}

export interface Investment {
  id: string;
  name: string;
  amount: number;
  type: string;
  date: string;
}
