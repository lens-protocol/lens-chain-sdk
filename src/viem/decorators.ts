import { Account, Client, Transport } from 'viem';

import {
  sendRawTransactionWithDetailedOutput,
  type SendRawTransactionWithDetailedOutputParameters,
  type SendRawTransactionWithDetailedOutputReturnType,
} from './actions/sendRawTransactionWithDetailedOutput';
import { LensChain } from './chains';

export type WalletActions = {
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
    TChain extends LensChain = LensChain,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<Transport, TChain, TAccount>,
  ): WalletActions => ({
    sendRawTransactionWithDetailedOutput: (params) =>
      sendRawTransactionWithDetailedOutput(client, params),
  });
}
