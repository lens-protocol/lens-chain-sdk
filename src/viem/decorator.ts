import { Account, Chain, Client, Transport } from 'viem';

import {
  GetBlockNumberByTimeParameters,
  GetBlockNumberByTimeReturnType,
  getBlockNumberByTime,
} from './actions/getBlockNumberByTime';
import {
  sendRawTransactionWithDetailedOutput,
  type SendRawTransactionWithDetailedOutputParameters,
  type SendRawTransactionWithDetailedOutputReturnType,
} from './actions/sendRawTransactionWithDetailedOutput';

export type LensNetworkActions = {
  /**
   * Retrieve the block number closest to the given timestamp.
   *
   * @param client - Client to use
   * @param parameters - {@link GetBlockNumberByTimeParameters}
   * @returns The block number. {@link GetBlockNumberByTimeReturnType}
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
   * const result = await getBlockNumberByTime(client, {
   *   before: 1630000000,
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
    getBlockNumberByTime: (args) => getBlockNumberByTime(client, args),

    sendRawTransactionWithDetailedOutput: (args) =>
      sendRawTransactionWithDetailedOutput(client, args),
  });
}
