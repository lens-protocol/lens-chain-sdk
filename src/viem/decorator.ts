import { Account, Chain, Client, Transport } from 'viem';

import {
  sendRawTransactionWithDetailedOutput,
  type SendRawTransactionWithDetailedOutputParameters,
  type SendRawTransactionWithDetailedOutputReturnType,
} from './actions/sendRawTransactionWithDetailedOutput';

export type LensNetworkActions = {
  /**
   * Executes a transaction and returns its hash, storage logs, and events that would have
   * been generated if the transaction had already been included in the block.
   *
   * @param parameters - {@link SendRawTransactionWithDetailedOutputParameters}
   * @returns The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash, storage logs, and events. {@link SendRawTransactionWithDetailedOutputReturnType}
   *
   * @example
   * ```ts
   * import { createWalletClient, http } from 'viem';
   * import { privateKeyToAccount } from 'viem/accounts';
   * import { actions, chains } from '@lens-network/sdk/viem';
   *
   * const client = createWalletClient({
   *   account: privateKeyToAccount('0x…'),
   *   chain: chains.sepoliaDevelopment,
   *   transport: http(),
   * }).extend(publicActionsL1();
   *
   * const result = await client.sendRawTransactionWithDetailedOutput({
   *   serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33'
   * });
   * ```
   */
  sendRawTransactionWithDetailedOutput: (
    _args: SendRawTransactionWithDetailedOutputParameters,
  ) => Promise<SendRawTransactionWithDetailedOutputReturnType>;
};

export function lensNetworkActions() {
  return <
    TChain extends Chain | undefined = Chain | undefined,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<Transport, TChain, TAccount>,
  ): LensNetworkActions => ({
    sendRawTransactionWithDetailedOutput: (args) =>
      sendRawTransactionWithDetailedOutput(client, args),
  });
}
