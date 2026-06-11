# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListUserAccounts*](#listuseraccounts)
- [**Mutations**](#mutations)
  - [*CreateDebt*](#createdebt)
  - [*UpdateAccountBalance*](#updateaccountbalance)
  - [*DeleteTransaction*](#deletetransaction)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListUserAccounts
You can execute the `ListUserAccounts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUserAccounts(options?: ExecuteQueryOptions): QueryPromise<ListUserAccountsData, undefined>;

interface ListUserAccountsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUserAccountsData, undefined>;
}
export const listUserAccountsRef: ListUserAccountsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUserAccounts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUserAccountsData, undefined>;

interface ListUserAccountsRef {
  ...
  (dc: DataConnect): QueryRef<ListUserAccountsData, undefined>;
}
export const listUserAccountsRef: ListUserAccountsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUserAccountsRef:
```typescript
const name = listUserAccountsRef.operationName;
console.log(name);
```

### Variables
The `ListUserAccounts` query has no variables.
### Return Type
Recall that executing the `ListUserAccounts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUserAccountsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListUserAccounts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUserAccounts } from '@dataconnect/generated';


// Call the `listUserAccounts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUserAccounts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUserAccounts(dataConnect);

console.log(data.accounts);

// Or, you can use the `Promise` API.
listUserAccounts().then((response) => {
  const data = response.data;
  console.log(data.accounts);
});
```

### Using `ListUserAccounts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUserAccountsRef } from '@dataconnect/generated';


// Call the `listUserAccountsRef()` function to get a reference to the query.
const ref = listUserAccountsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUserAccountsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.accounts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.accounts);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateDebt
You can execute the `CreateDebt` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDebt(vars: CreateDebtVariables): MutationPromise<CreateDebtData, CreateDebtVariables>;

interface CreateDebtRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDebtVariables): MutationRef<CreateDebtData, CreateDebtVariables>;
}
export const createDebtRef: CreateDebtRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDebt(dc: DataConnect, vars: CreateDebtVariables): MutationPromise<CreateDebtData, CreateDebtVariables>;

interface CreateDebtRef {
  ...
  (dc: DataConnect, vars: CreateDebtVariables): MutationRef<CreateDebtData, CreateDebtVariables>;
}
export const createDebtRef: CreateDebtRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDebtRef:
```typescript
const name = createDebtRef.operationName;
console.log(name);
```

### Variables
The `CreateDebt` mutation requires an argument of type `CreateDebtVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateDebtVariables {
  name: string;
  totalAmount: number;
  monthlyPayment: number;
  dueDate: DateString;
  accountId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateDebt` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDebtData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDebtData {
  debt_insert: Debt_Key;
}
```
### Using `CreateDebt`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDebt, CreateDebtVariables } from '@dataconnect/generated';

// The `CreateDebt` mutation requires an argument of type `CreateDebtVariables`:
const createDebtVars: CreateDebtVariables = {
  name: ..., 
  totalAmount: ..., 
  monthlyPayment: ..., 
  dueDate: ..., 
  accountId: ..., 
};

// Call the `createDebt()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDebt(createDebtVars);
// Variables can be defined inline as well.
const { data } = await createDebt({ name: ..., totalAmount: ..., monthlyPayment: ..., dueDate: ..., accountId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDebt(dataConnect, createDebtVars);

console.log(data.debt_insert);

// Or, you can use the `Promise` API.
createDebt(createDebtVars).then((response) => {
  const data = response.data;
  console.log(data.debt_insert);
});
```

### Using `CreateDebt`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDebtRef, CreateDebtVariables } from '@dataconnect/generated';

// The `CreateDebt` mutation requires an argument of type `CreateDebtVariables`:
const createDebtVars: CreateDebtVariables = {
  name: ..., 
  totalAmount: ..., 
  monthlyPayment: ..., 
  dueDate: ..., 
  accountId: ..., 
};

// Call the `createDebtRef()` function to get a reference to the mutation.
const ref = createDebtRef(createDebtVars);
// Variables can be defined inline as well.
const ref = createDebtRef({ name: ..., totalAmount: ..., monthlyPayment: ..., dueDate: ..., accountId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDebtRef(dataConnect, createDebtVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.debt_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.debt_insert);
});
```

## UpdateAccountBalance
You can execute the `UpdateAccountBalance` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateAccountBalance(vars: UpdateAccountBalanceVariables): MutationPromise<UpdateAccountBalanceData, UpdateAccountBalanceVariables>;

interface UpdateAccountBalanceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAccountBalanceVariables): MutationRef<UpdateAccountBalanceData, UpdateAccountBalanceVariables>;
}
export const updateAccountBalanceRef: UpdateAccountBalanceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAccountBalance(dc: DataConnect, vars: UpdateAccountBalanceVariables): MutationPromise<UpdateAccountBalanceData, UpdateAccountBalanceVariables>;

interface UpdateAccountBalanceRef {
  ...
  (dc: DataConnect, vars: UpdateAccountBalanceVariables): MutationRef<UpdateAccountBalanceData, UpdateAccountBalanceVariables>;
}
export const updateAccountBalanceRef: UpdateAccountBalanceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAccountBalanceRef:
```typescript
const name = updateAccountBalanceRef.operationName;
console.log(name);
```

### Variables
The `UpdateAccountBalance` mutation requires an argument of type `UpdateAccountBalanceVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAccountBalanceVariables {
  id: UUIDString;
  newBalance: number;
}
```
### Return Type
Recall that executing the `UpdateAccountBalance` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAccountBalanceData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAccountBalanceData {
  account_update?: Account_Key | null;
}
```
### Using `UpdateAccountBalance`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAccountBalance, UpdateAccountBalanceVariables } from '@dataconnect/generated';

// The `UpdateAccountBalance` mutation requires an argument of type `UpdateAccountBalanceVariables`:
const updateAccountBalanceVars: UpdateAccountBalanceVariables = {
  id: ..., 
  newBalance: ..., 
};

// Call the `updateAccountBalance()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAccountBalance(updateAccountBalanceVars);
// Variables can be defined inline as well.
const { data } = await updateAccountBalance({ id: ..., newBalance: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAccountBalance(dataConnect, updateAccountBalanceVars);

console.log(data.account_update);

// Or, you can use the `Promise` API.
updateAccountBalance(updateAccountBalanceVars).then((response) => {
  const data = response.data;
  console.log(data.account_update);
});
```

### Using `UpdateAccountBalance`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAccountBalanceRef, UpdateAccountBalanceVariables } from '@dataconnect/generated';

// The `UpdateAccountBalance` mutation requires an argument of type `UpdateAccountBalanceVariables`:
const updateAccountBalanceVars: UpdateAccountBalanceVariables = {
  id: ..., 
  newBalance: ..., 
};

// Call the `updateAccountBalanceRef()` function to get a reference to the mutation.
const ref = updateAccountBalanceRef(updateAccountBalanceVars);
// Variables can be defined inline as well.
const ref = updateAccountBalanceRef({ id: ..., newBalance: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAccountBalanceRef(dataConnect, updateAccountBalanceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.account_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.account_update);
});
```

## DeleteTransaction
You can execute the `DeleteTransaction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTransaction(vars: DeleteTransactionVariables): MutationPromise<DeleteTransactionData, DeleteTransactionVariables>;

interface DeleteTransactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTransactionVariables): MutationRef<DeleteTransactionData, DeleteTransactionVariables>;
}
export const deleteTransactionRef: DeleteTransactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTransaction(dc: DataConnect, vars: DeleteTransactionVariables): MutationPromise<DeleteTransactionData, DeleteTransactionVariables>;

interface DeleteTransactionRef {
  ...
  (dc: DataConnect, vars: DeleteTransactionVariables): MutationRef<DeleteTransactionData, DeleteTransactionVariables>;
}
export const deleteTransactionRef: DeleteTransactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTransactionRef:
```typescript
const name = deleteTransactionRef.operationName;
console.log(name);
```

### Variables
The `DeleteTransaction` mutation requires an argument of type `DeleteTransactionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTransactionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteTransaction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTransactionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTransactionData {
  transaction_delete?: Transaction_Key | null;
}
```
### Using `DeleteTransaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTransaction, DeleteTransactionVariables } from '@dataconnect/generated';

// The `DeleteTransaction` mutation requires an argument of type `DeleteTransactionVariables`:
const deleteTransactionVars: DeleteTransactionVariables = {
  id: ..., 
};

// Call the `deleteTransaction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTransaction(deleteTransactionVars);
// Variables can be defined inline as well.
const { data } = await deleteTransaction({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTransaction(dataConnect, deleteTransactionVars);

console.log(data.transaction_delete);

// Or, you can use the `Promise` API.
deleteTransaction(deleteTransactionVars).then((response) => {
  const data = response.data;
  console.log(data.transaction_delete);
});
```

### Using `DeleteTransaction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTransactionRef, DeleteTransactionVariables } from '@dataconnect/generated';

// The `DeleteTransaction` mutation requires an argument of type `DeleteTransactionVariables`:
const deleteTransactionVars: DeleteTransactionVariables = {
  id: ..., 
};

// Call the `deleteTransactionRef()` function to get a reference to the mutation.
const ref = deleteTransactionRef(deleteTransactionVars);
// Variables can be defined inline as well.
const ref = deleteTransactionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTransactionRef(dataConnect, deleteTransactionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.transaction_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.transaction_delete);
});
```

