import { Account, Chain, Client, Transport } from 'viem';
import { RequestErrorType } from 'viem/utils';

import { TxHistoryRequest, PagingResult } from '../../types';
import { PublicLensNetworkRpcSchema } from '../types';

export type TxHistoryItem = {
  /**
   * The transaction hash.
   */
  hash: string;
  to: string;
  from: string;
  transactionIndex: string;
  input: string;
  value: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  fee: string;
  nonce: string;
  confirmations: string;
  blockNumber: string;
  blockHash: string;
  /**
   * Timestamp in seconds since the Unix epoch.
   */
  timeStamp: string;
  commitTxHash?: string;
  proveTxHash?: string;
  executeTxHash?: string;
  isL1Originated: string;
  l1BatchNumber: string;
  contractAddress?: string;
  isError: string;
  txreceipt_status: string;
  methodId: string;
  functionName: string;
  type: string;
};

export type GetTxHistoryParameters = TxHistoryRequest;

export type GetTxHistoryReturnType = PagingResult<TxHistoryItem>;

export type GetTxHistoryErrorType = RequestErrorType;

/**
 * Retrieve transactions for a given address.
 *
 * @param client - Client to use
 * @param parameters - {@link GetTxHistoryParameters}
 * @returns The transactions for the given address. {@link GetTxHistoryReturnType}
 *
 * @example
 * ```ts
 * import { createPublicClient, http } from 'viem';
 * import { chains, getTxHistory } from '@lens-network/sdk/viem';
 *
 * const client = createPublicClient({
 *   chain: chains.staging,
 *   transport: http(),
 * });
 *
 * const { items } = await getTxHistory(client, {
 *   before: 1630000000,
 * });
 *
 * // items: [Transaction, Transaction, ...]
 * ```
 */
export async function getTxHistory<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount, PublicLensNetworkRpcSchema>,
  request: GetTxHistoryParameters,
): Promise<GetTxHistoryReturnType> {
  return client.request(
    {
      method: 'lens_getTxHistory',
      params: [request],
    },
    { retryCount: 0 },
  );
}
