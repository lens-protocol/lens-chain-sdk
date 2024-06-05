import { Account, Address, Chain, Client, Hex, Transport } from 'viem';
import { RequestErrorType } from 'viem/utils';

import { TxHistoryRequest, PagingResult } from '../../types';
import { PublicLensNetworkRpcSchema } from '../types';

export type TxHistoryItem = {
  /**
   * The transaction hash.
   */
  hash: Hex;
  to: Address;
  from: Address;
  transactionIndex: Hex;
  input: Hex;
  value: Hex;
  gas: Hex;
  gasPrice: Hex;
  gasUsed: Hex;
  cumulativeGasUsed: Hex;
  fee: Hex;
  nonce: Hex;
  confirmations: Hex;
  blockNumber: Hex;
  blockHash: Hex;
  /**
   * Timestamp in seconds since the Unix epoch.
   */
  timeStamp: Hex;
  commitTxHash: Hex | null;
  proveTxHash: Hex | null;
  executeTxHash: Hex | null;
  isL1Originated: Hex;
  l1BatchNumber: Hex;
  contractAddress: Address | null;
  isError: Hex;
  txreceipt_status: Hex;
  methodId: Hex;
  functionName: string;
  type: Hex;
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
