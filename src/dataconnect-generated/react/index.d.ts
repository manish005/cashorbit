import { CreateDebtData, CreateDebtVariables, UpdateAccountBalanceData, UpdateAccountBalanceVariables, DeleteTransactionData, DeleteTransactionVariables, ListUserAccountsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateDebt(options?: useDataConnectMutationOptions<CreateDebtData, FirebaseError, CreateDebtVariables>): UseDataConnectMutationResult<CreateDebtData, CreateDebtVariables>;
export function useCreateDebt(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDebtData, FirebaseError, CreateDebtVariables>): UseDataConnectMutationResult<CreateDebtData, CreateDebtVariables>;

export function useUpdateAccountBalance(options?: useDataConnectMutationOptions<UpdateAccountBalanceData, FirebaseError, UpdateAccountBalanceVariables>): UseDataConnectMutationResult<UpdateAccountBalanceData, UpdateAccountBalanceVariables>;
export function useUpdateAccountBalance(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAccountBalanceData, FirebaseError, UpdateAccountBalanceVariables>): UseDataConnectMutationResult<UpdateAccountBalanceData, UpdateAccountBalanceVariables>;

export function useDeleteTransaction(options?: useDataConnectMutationOptions<DeleteTransactionData, FirebaseError, DeleteTransactionVariables>): UseDataConnectMutationResult<DeleteTransactionData, DeleteTransactionVariables>;
export function useDeleteTransaction(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTransactionData, FirebaseError, DeleteTransactionVariables>): UseDataConnectMutationResult<DeleteTransactionData, DeleteTransactionVariables>;

export function useListUserAccounts(options?: useDataConnectQueryOptions<ListUserAccountsData>): UseDataConnectQueryResult<ListUserAccountsData, undefined>;
export function useListUserAccounts(dc: DataConnect, options?: useDataConnectQueryOptions<ListUserAccountsData>): UseDataConnectQueryResult<ListUserAccountsData, undefined>;
