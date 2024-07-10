import { Account, Address, Chain, Client, Transport } from 'viem';
import { RequestErrorType } from 'viem/utils';

import { TxHistoryRequest, PagingResult } from '../../types';
import { PublicLensNetworkRpcSchema, TxHistoryItem } from '../types';

export type GetTxHistoryParameters = TxHistoryRequest<Address>;

export type GetTxHistoryReturnType = PagingResult<TxHistoryItem>;

export type GetTxHistoryErrorType = RequestErrorType;

/**
 * Retrieve transactions for a given address.
 *
 * @param client - Client to use
 * @param params - {@link GetTxHistoryParameters}
 * @returns The transactions for the given address. {@link GetTxHistoryReturnType}
 *
 * @example
 * ```ts
 * import { createPublicClient, http } from 'viem';
 * import { chains, getTxHistory } from '@lens-network/sdk/viem';
 *
 * const client = createPublicClient({
 *   chain: chains.testnet,
 *   transport: http(),
 * });
 *
 * const { items } = await getTxHistory(client, {
 *   address: '0x1234567…',
 *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
 * });
 *
 * // items: [TxHistoryItem, TxHistoryItem, …]
 * ```
 */
export async function getTxHistory<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount, PublicLensNetworkRpcSchema>,
  params: GetTxHistoryParameters,
): Promise<GetTxHistoryReturnType> {
  return client.request(
    {
      method: 'lens_getTxHistory',
      params: [params],
    },
    { retryCount: 0 },
  );
}
