import { Account, Chain, Client, Transport } from 'viem';

import {
  GetBlockNumberByTimeParameters,
  GetBlockNumberByTimeReturnType,
  getBlockNumberByTime,
} from './actions/getBlockNumberByTime';
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
   * Retrieve the block number closest to the given timestamp.
   *
   * @param parameters - {@link GetTxHistoryParameters}
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
   *   address: '0x1234...',
   *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
   * });
   *
   * // items: [Transaction, Transaction, ...]
   * ```
   */
  getTxHistory(args: GetTxHistoryParameters): Promise<GetTxHistoryReturnType>;
  /**
   * Retrieve the block number closest to the given timestamp.
   *
   * @param parameters - {@link GetTxHistoryParameters}
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
   *   closest: 'before',
   *   timestamp: 1630000000,
   * });
   *
   * // result: 0xa
   * ```
   */
  getBlockNumberByTime: (
    args: GetBlockNumberByTimeParameters,
  ) => Promise<GetBlockNumberByTimeReturnType>;
  /**
   * Executes a transaction and returns its hash, storage logs, and events that would have
   * been generated if the transaction had already been included in the block.
   *
   * @param parameters - {@link SendRawTransactionWithDetailedOutputParameters}
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
    args: SendRawTransactionWithDetailedOutputParameters,
  ) => Promise<SendRawTransactionWithDetailedOutputReturnType>;
};

export function lensNetworkActions() {
  return <
    TChain extends Chain | undefined = Chain | undefined,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<Transport, TChain, TAccount>,
  ): LensNetworkActions => ({
    getTxHistory: (args) => getTxHistory(client, args),

    getBlockNumberByTime: (args) => getBlockNumberByTime(client, args),

    sendRawTransactionWithDetailedOutput: (args) =>
      sendRawTransactionWithDetailedOutput(client, args),
  });
}
