import { Account, Client, Transport } from 'viem';
import { type SendRawTransactionErrorType, type SendRawTransactionParameters } from 'viem/actions';
import { ChainEIP712 } from 'viem/zksync';

import { PublicLensNetworkRpcSchema, SendRawTransactionDetails } from '../types';

export type {
  SendRawTransactionErrorType,
  SendRawTransactionParameters,
  SendRawTransactionDetails,
};

export type SendRawTransactionWithDetailedOutputParameters = SendRawTransactionParameters;

export type SendRawTransactionWithDetailedOutputReturnType = SendRawTransactionDetails;

export type SendRawTransactionWithDetailedOutputErrorType = SendRawTransactionErrorType;

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
 *   serializedTransaction: '0x02f8500182031180…'
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
