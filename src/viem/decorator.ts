import { Account, Chain, Client, Transport } from 'viem';

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

export type LensNetworkActions = {
  /**
   * Retrieve the ABI for a given contract address.
   *
   * @param params - {@link GetContractAbiParameters}
   * @returns The ABI as serialized JSON string. {@link GetContractAbiReturnType}
   *
   * @example
   * ```ts
   * import { createPublicClient, http } from 'viem';
   * import { chains, lensNetworkActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.staging,
   *   transport: http(),
   * }).extend(lensNetworkActions();
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
   * import { chains, lensNetworkActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.staging,
   *   transport: http(),
   * }).extend(lensNetworkActions();
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
   * import { chains, lensNetworkActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.staging,
   *   transport: http(),
   * }).extend(lensNetworkActions();
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
   * import { chains, lensNetworkActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.staging,
   *   transport: http(),
   * }).extend(lensNetworkActions();
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
   * import { chains, lensNetworkActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.staging,
   *   transport: http(),
   * }).extend(lensNetworkActions();
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
   * import { chains, lensNetworkActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.staging,
   *   transport: http(),
   * }).extends(lensNetworkActions());
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
  /**
   * Executes a transaction and returns its hash, storage logs, and events that would have
   * been generated if the transaction had already been included in the block.
   *
   * @param params - {@link SendRawTransactionWithDetailedOutputParameters}
   * @returns The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash, storage logs, and events. {@link SendRawTransactionWithDetailedOutputReturnType}
   *
   * @example
   * ```ts
   * import { createPublicClient, http } from 'viem';
   * import { chains, lensNetworkActions } from '@lens-network/sdk/viem';
   *
   * const client = createPublicClient({
   *   chain: chains.staging,
   *   transport: http(),
   * }).extend(lensNetworkActions();
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

export function lensNetworkActions() {
  return <
    TChain extends Chain | undefined = Chain | undefined,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<Transport, TChain, TAccount>,
  ): LensNetworkActions => ({
    getContractABI: (params) => getContractABI(client, params),

    getTokenTxHistory: (params) => getTokenTxHistory(client, params),

    getTokenInfo: (params) => getTokenInfo(client, params),

    getContractCreation: (params) => getContractCreation(client, params),

    getTxHistory: (params) => getTxHistory(client, params),

    getBlockNumberByTime: (params) => getBlockNumberByTime(client, params),

    sendRawTransactionWithDetailedOutput: (params) =>
      sendRawTransactionWithDetailedOutput(client, params),
  });
}
