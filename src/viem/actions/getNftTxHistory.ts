import { Account, Chain, Client, Transport } from 'viem';
import { RequestErrorType } from 'viem/utils';

import { TokenTxHistoryRequest, PagingResult } from '../../types';
import { PublicLensNetworkRpcSchema, TokenTxHistoryItem } from '../types';

export type GetNftTxHistoryParameters = TokenTxHistoryRequest;

export type GetNftTxHistoryReturnType = PagingResult<TokenTxHistoryItem>;

export type GetNftTxHistoryErrorType = RequestErrorType;

/**
 * Retrieve NFT transfers for a given address with ability to filter by token address.
 *
 * @param client - Client to use
 * @param params - {@link GetNftTxHistoryParameters}
 * @returns The transactions for the given address. {@link GetNftTxHistoryReturnType}
 *
 * @example
 * ```ts
 * import { createPublicClient, http } from 'viem';
 * import { chains, getNftTxHistory } from '@lens-network/sdk/viem';
 *
 * const client = createPublicClient({
 *   chain: chains.staging,
 *   transport: http(),
 * });
 *
 * const { items } = await getNftTxHistory(client, {
 *   address: '0x1234567…',
 *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
 * });
 *
 * // items: [TokenTxHistoryItem, TokenTxHistoryItem, …]
 * ```
 */
export async function getNftTxHistory<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount, PublicLensNetworkRpcSchema>,
  params: GetNftTxHistoryParameters,
): Promise<GetNftTxHistoryReturnType> {
  return client.request(
    {
      method: 'lens_getNftTxHistory',
      params: [params],
    },
    { retryCount: 0 },
  );
}
