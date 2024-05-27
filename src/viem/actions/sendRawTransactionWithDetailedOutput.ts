import { Account, Client, Transport } from 'viem';
import {
  type SendRawTransactionErrorType as SendRawTransactionErrorType_,
  type SendRawTransactionParameters as SendRawTransactionParameters_,
} from 'viem/actions';
import { ChainEIP712 } from 'viem/zksync';

import { PublicLensNetworkRpcSchema, SendTransactionDetails } from '../types';

export type SendRawTransactionWithDetailedOutputParameters = SendRawTransactionParameters_;

export type SendRawTransactionWithDetailedOutputReturnType = SendTransactionDetails;

export type SendRawTransactionWithDetailedOutputErrorType = SendRawTransactionErrorType_;

/**
 * Executes a transaction and returns its hash, storage logs, and events that would have
 * been generated if the transaction had already been included in the block.
 *
 * @param client - Client to use
 * @param parameters - {@link SendRawTransactionWithDetailedOutputParameters}
 * @returns The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash, storage logs, and events. {@link SendRawTransactionWithDetailedOutputReturnType}
 *
 * @example
 * ```ts
 * import { createWalletClient, http } from 'viem';
 * import { privateKeyToAccount } from 'viem/accounts';
 * import { chains, sendRawTransactionWithDetailedOutput } from '@lens-network/sdk/viem';
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: chains.sepoliaDevelopment,
 *   transport: http(),
 * });
 *
 * const result = await sendRawTransactionWithDetailedOutput(client, {
 *   serializedTransaction: '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33'
 * });
 * ```
 */
export async function sendRawTransactionWithDetailedOutput<
  TChain extends ChainEIP712 | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount, PublicLensNetworkRpcSchema>,
  { serializedTransaction }: SendRawTransactionWithDetailedOutputParameters,
): Promise<SendRawTransactionWithDetailedOutputReturnType> {
  return client.request(
    {
      method: 'zks_sendRawTransactionWithDetailedOutput',
      params: [serializedTransaction],
    },
    { retryCount: 0 },
  );
}
