import { Account, Chain, Client, Transport } from 'viem';

import { CreateERC20Parameters, CreateERC20ReturnType, createERC20 } from './actions/createERC20';
import {
  CreateERC721Parameters,
  CreateERC721ReturnType,
  createERC721,
} from './actions/createERC721';
import {
  GetBlockNumberByTimeParameters,
  GetBlockNumberByTimeReturnType,
  getBlockNumberByTime,
} from './actions/getBlockNumberByTime';
import {
  GetContractAbiParameters,
  GetContractAbiReturnType,
  getContractABI,
} from './actions/getContractABI';
import {
  GetContractCreationParameters,
  GetContractCreationReturnType,
  getContractCreation,
} from './actions/getContractCreation';
import {
  GetNftTxHistoryParameters,
  GetNftTxHistoryReturnType,
  getNftTxHistory,
} from './actions/getNftTxHistory';
import {
  GetTokenBalanceParameters,
  GetTokenBalanceReturnType,
  getTokenBalance,
} from './actions/getTokenBalance';
import {
  GetTokenInfoParameters,
  GetTokenInfoReturnType,
  getTokenInfo,
} from './actions/getTokenInfo';
import {
  GetTokenTxHistoryParameters,
  GetTokenTxHistoryReturnType,
  getTokenTxHistory,
} from './actions/getTokenTxHistory';
import {
  GetTxHistoryParameters,
  GetTxHistoryReturnType,
  getTxHistory,
} from './actions/getTxHistory';
import {
  sendRawTransactionWithDetailedOutput,
  type SendRawTransactionWithDetailedOutputParameters,
  type SendRawTransactionWithDetailedOutputReturnType,
} from './actions/sendRawTransactionWithDetailedOutput';
import { LensNetworkChain } from './chains';

export type PublicActions = {
  /**
   * Retrieve token balance for a given address.
   *
   * @param params - {@link GetTokenBalanceParameters}
   * @returns The token balance. {@link GetTokenBalanceReturnType}
   *
   * @example
   * ```ts
   * import { createPublicClient, http } from 'viem';
   * import { chains, publicActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(publicActions());
   *
   * const balance = await client.getTokenBalance({
   *   address: '0x1234567…',
   *   contractAddress: '0x1234567…',
   * });
   *
   * // balance: '0x10042…'
   * ```
   */
  getTokenBalance(params: GetTokenBalanceParameters): Promise<GetTokenBalanceReturnType>;
  /**
   * Retrieve the ABI for a given contract address.
   *
   * @param params - {@link GetContractAbiParameters}
   * @returns The ABI as serialized JSON string. {@link GetContractAbiReturnType}
   *
   * @example
   * ```ts
   * import { createPublicClient, http } from 'viem';
   * import { chains, publicActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(publicActions());
   *
   * const abi = await client.getContractABI({
   *   address: '0x1234567…',
   * });
   *
   * // abi: '[ { inputs: [ … ], … }, … }'
   * ```
   */
  getContractABI({ address }: GetContractAbiParameters): Promise<GetContractAbiReturnType>;
  /**
   * Retrieve token transfers for a given address with ability to filter by token address.
   *
   * @param params - {@link GetTokenTxHistoryParameters}
   * @returns The transactions for the given address. {@link GetTokenTxHistoryReturnType}
   *
   * @example
   * ```ts
   * import { createPublicClient, http } from 'viem';
   * import { chains, publicActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(publicActions());
   *
   * const { items } = await client.getTokenTxHistory({
   *   address: '0x1234567…',
   *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
   * });
   *
   * // items: [TokenTxHistoryItem, TokenTxHistoryItem, …]
   * ```
   */
  getTokenTxHistory(params: GetTokenTxHistoryParameters): Promise<GetTokenTxHistoryReturnType>;
  /**
   * Retrieve NFT transfers for a given address with ability to filter by token address.
   *
   * @param params - {@link GetNftTxHistoryParameters}
   * @returns The transactions for the given address. {@link GetNftTxHistoryReturnType}
   *
   * @example
   * ```ts
   * import { createPublicClient, http } from 'viem';
   * import { chains, publicActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(publicActions());
   *
   * const { items } = await client.getNftTxHistory({
   *   address: '0x1234567…',
   *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
   * });
   *
   * // items: [TokenTxHistoryItem, TokenTxHistoryItem, …]
   * ```
   */
  getNftTxHistory(params: GetNftTxHistoryParameters): Promise<GetNftTxHistoryReturnType>;
  /**
   * Retrieve token information.
   *
   * Token price, liquidity and icon are retrieved from CoinGecko. The data is updated every 24 hours.
   *
   * @param params - {@link GetTokenInfoParameters}
   * @returns The token information - {@link GetTokenInfoReturnType}
   *
   * @example
   * ```ts
   * import { createPublicClient, http } from 'viem';
   * import { chains, publicActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(publicActions());
   *
   * const result = await client.getTokenInfo({
   *   address: '0x1234567…'
   * });
   *
   * // result: TokenInfoResult | null
   * ```
   */
  getTokenInfo(params: GetTokenInfoParameters): Promise<GetTokenInfoReturnType>;
  /**
   * Retrieve contracts creation details, up to 5 at a time.
   *
   * @param params - {@link GetContractCreationParameters}
   * @returns The contract creation details - {@link GetContractCreationReturnType}
   *
   * @example
   * ```ts
   * import { createPublicClient, http } from 'viem';
   * import { chains, publicActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(publicActions());
   *
   * const result = await client.getContractCreation({
   *   addresses: [ '0x1234567…' ]
   * }););
   *
   * // result: [ContractsCreationResult, ContractsCreationResult, …]
   * ```
   */
  getContractCreation(
    params: GetContractCreationParameters,
  ): Promise<GetContractCreationReturnType>;
  /**
   * Retrieve transactions for a given address.
   *
   * @param params - {@link GetTxHistoryParameters}
   * @returns The transactions for the given address. {@link GetTxHistoryReturnType}
   *
   * @example
   * ```ts
   * import { createPublicClient, http } from 'viem';
   * import { chains, publicActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(publicActions());
   *
   * const { items } = await client.getTxHistory({
   *   address: '0x1234…',
   *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
   * });
   *
   * // items: [TxHistoryItem, TxHistoryItem, …]
   * ```
   */
  getTxHistory(params: GetTxHistoryParameters): Promise<GetTxHistoryReturnType>;
  /**
   * Retrieve the block number closest to the given timestamp.
   *
   * @param params - {@link GetTxHistoryParameters}
   * @returns The transactions for the given address. {@link GetTxHistoryReturnType}
   *
   * @example
   * ```ts
   * import { createPublicClient, http } from 'viem';
   * import { chains, publicActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extends(publicActions());
   *
   * const result = await client.getBlockNumberByTime({
   *   address: '0x1234567…',
   *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
   * });
   *
   * // result: 0xa
   * ```
   */
  getBlockNumberByTime: (
    params: GetBlockNumberByTimeParameters,
  ) => Promise<GetBlockNumberByTimeReturnType>;
};

export function publicActions() {
  return <
    TChain extends Chain | undefined = Chain | undefined,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<Transport, TChain, TAccount>,
  ): PublicActions => ({
    getTokenBalance: (params) => getTokenBalance(client, params),

    getContractABI: (params) => getContractABI(client, params),

    getTokenTxHistory: (params) => getTokenTxHistory(client, params),

    getNftTxHistory: (params) => getNftTxHistory(client, params),

    getTokenInfo: (params) => getTokenInfo(client, params),

    getContractCreation: (params) => getContractCreation(client, params),

    getTxHistory: (params) => getTxHistory(client, params),

    getBlockNumberByTime: (params) => getBlockNumberByTime(client, params),
  });
}

export type WalletActions = {
  /**
   * Create an ERC-20 contract with the given parameters.
   *
   * @param client - Client to use
   * @param parameters - {@link CreateERC20Parameters}
   * @returns The newly created ERC-20 contract address. {@link CreateERC20ReturnType}
   *
   * @example
   * ```ts
   * import { createWalletClient, Hex, http, privateKeyToAccount } from 'viem';
   * import { chains, walletActions } from '@lens-network/sdk/viem';
   *
   * const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
   *
   * export const walletClient = createWalletClient({
   *   account,
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(walletActions());
   *
   * const tokenAddress = await client.createERC20({
   *   admins: [],
   *   decimals: 18,
   *   iconURI: 'https://example.com/icon.png',
   *   initialOwner: account.address,
   *   maxSupply: 100_000_000_000_000_000_000n,
   *   minters: [],
   *   mintRate: 0n,
   *   name: 'SDK Test Token',
   *   symbol: 'SDK',
   * });
   *
   * // tokenAddress: 0x…
   * ```
   */
  createERC20: (params: CreateERC20Parameters) => Promise<CreateERC20ReturnType>;
  /**
   * Create an ERC-721 contract with the given parameters.
   *
   * @param client - Client to use
   * @param parameters - {@link CreateERC20Parameters}
   * @returns The newly created ERC-721 contract address. {@link CreateERC20ReturnType}
   *
   * @example
   * ```ts
   * import { createWalletClient, Hex, http, privateKeyToAccount } from 'viem';
   * import { chains, walletActions } from '@lens-network/sdk/viem';
   *
   * const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
   *
   * export const walletClient = createWalletClient({
   *   account,
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(walletActions());
   *
   * const tokenAddress = await client.createERC721({
   *   admins: [],
   *   iconURI: 'https://example.com/icon.png',
   *   initialOwner: account.address,
   *   maxSupply: 100,
   *   minters: [],
   *   mintRate: 0n,
   *   name: 'My Collection',
   *   symbol: 'SDK',
   * });
   *
   * // tokenAddress: 0x…
   * ```
   */
  createERC721: (params: CreateERC721Parameters) => Promise<CreateERC721ReturnType>;
  /**
   * Executes a transaction and returns its hash, storage logs, and events that would have
   * been generated if the transaction had already been included in the block.
   *
   * @param params - {@link SendRawTransactionWithDetailedOutputParameters}
   * @returns The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash, storage logs, and events. {@link SendRawTransactionWithDetailedOutputReturnType}
   *
   * @example
   * ```ts
   * import { createWalletClient, Hex, http, privateKeyToAccount } from 'viem';
   * import { chains, walletActions } from '@lens-network/sdk/viem';
   *
   * const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
   *
   * export const walletClient = createWalletClient({
   *   account,
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(walletActions());
   *
   * const result = await client.sendRawTransactionWithDetailedOutput({
   *   serializedTransaction: '0x02f8500182031180…',
   * });
   * ```
   */
  sendRawTransactionWithDetailedOutput: (
    params: SendRawTransactionWithDetailedOutputParameters,
  ) => Promise<SendRawTransactionWithDetailedOutputReturnType>;
};

export function walletActions() {
  return <
    TChain extends LensNetworkChain = LensNetworkChain,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<Transport, TChain, TAccount>,
  ): WalletActions => ({
    createERC20: (params) => createERC20(client, params),
    createERC721: (params) => createERC721(client, params),
    sendRawTransactionWithDetailedOutput: (params) =>
      sendRawTransactionWithDetailedOutput(client, params),
  });
}
