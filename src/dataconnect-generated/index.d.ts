import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Account_Key {
  id: UUIDString;
  __typename?: 'Account_Key';
}

export interface CreateDebtData {
  debt_insert: Debt_Key;
}

export interface CreateDebtVariables {
  name: string;
  totalAmount: number;
  monthlyPayment: number;
  dueDate: DateString;
  accountId: UUIDString;
}

export interface Debt_Key {
  id: UUIDString;
  __typename?: 'Debt_Key';
}

export interface DeleteTransactionData {
  transaction_delete?: Transaction_Key | null;
}

export interface DeleteTransactionVariables {
  id: UUIDString;
}

export interface ListUserAccountsData {
  accounts: ({
    name: string;
    type: string;
    currentBalance: number;
    transactions_on_account: ({
      amount: number;
      category: string;
      date: DateString;
    })[];
  })[];
}

export interface PortfolioItem_Key {
  id: UUIDString;
  __typename?: 'PortfolioItem_Key';
}

export interface Salary_Key {
  id: UUIDString;
  __typename?: 'Salary_Key';
}

export interface Transaction_Key {
  id: UUIDString;
  __typename?: 'Transaction_Key';
}

export interface UpdateAccountBalanceData {
  account_update?: Account_Key | null;
}

export interface UpdateAccountBalanceVariables {
  id: UUIDString;
  newBalance: number;
}

export interface UserProfile_Key {
  id: UUIDString;
  __typename?: 'UserProfile_Key';
}

interface CreateDebtRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDebtVariables): MutationRef<CreateDebtData, CreateDebtVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateDebtVariables): MutationRef<CreateDebtData, CreateDebtVariables>;
  operationName: string;
}
export const createDebtRef: CreateDebtRef;

export function createDebt(vars: CreateDebtVariables): MutationPromise<CreateDebtData, CreateDebtVariables>;
export function createDebt(dc: DataConnect, vars: CreateDebtVariables): MutationPromise<CreateDebtData, CreateDebtVariables>;

interface UpdateAccountBalanceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAccountBalanceVariables): MutationRef<UpdateAccountBalanceData, UpdateAccountBalanceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAccountBalanceVariables): MutationRef<UpdateAccountBalanceData, UpdateAccountBalanceVariables>;
  operationName: string;
}
export const updateAccountBalanceRef: UpdateAccountBalanceRef;

export function updateAccountBalance(vars: UpdateAccountBalanceVariables): MutationPromise<UpdateAccountBalanceData, UpdateAccountBalanceVariables>;
export function updateAccountBalance(dc: DataConnect, vars: UpdateAccountBalanceVariables): MutationPromise<UpdateAccountBalanceData, UpdateAccountBalanceVariables>;

interface DeleteTransactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTransactionVariables): MutationRef<DeleteTransactionData, DeleteTransactionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTransactionVariables): MutationRef<DeleteTransactionData, DeleteTransactionVariables>;
  operationName: string;
}
export const deleteTransactionRef: DeleteTransactionRef;

export function deleteTransaction(vars: DeleteTransactionVariables): MutationPromise<DeleteTransactionData, DeleteTransactionVariables>;
export function deleteTransaction(dc: DataConnect, vars: DeleteTransactionVariables): MutationPromise<DeleteTransactionData, DeleteTransactionVariables>;

interface ListUserAccountsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserAccountsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUserAccountsData, undefined>;
  operationName: string;
}
export const listUserAccountsRef: ListUserAccountsRef;

export function listUserAccounts(options?: ExecuteQueryOptions): QueryPromise<ListUserAccountsData, undefined>;
export function listUserAccounts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserAccountsData, undefined>;

