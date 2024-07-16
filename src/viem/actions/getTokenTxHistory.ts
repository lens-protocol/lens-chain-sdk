import { Account, Address, Chain, Client, Transport } from 'viem';
import { RequestErrorType } from 'viem/utils';

import { TokenTxHistoryRequest, PagingResult } from '../../types';
import { PublicLensNetworkRpcSchema, TokenTxHistoryItem } from '../types';

export type GetTokenTxHistoryParameters = TokenTxHistoryRequest<Address>;

export type GetTokenTxHistoryReturnType = PagingResult<TokenTxHistoryItem>;

export type GetTokenTxHistoryErrorType = RequestErrorType;

/**
 * Retrieve token transfers for a given address with ability to filter by token address.
 *
 * @param client - Client to use
 * @param params - {@link GetTokenTxHistoryParameters}
 * @returns The transactions for the given address. {@link GetTokenTxHistoryReturnType}
 *
 * @example
 * ```ts
 * import { createPublicClient, http } from 'viem';
 * import { chains, getTokenTxHistory } from '@lens-network/sdk/viem';
 *
 * const client = createPublicClient({
 *   chain: chains.testnet,
 *   transport: http(),
 * });
 *
 * const { items } = await getTokenTxHistory(client, {
 *   address: '0x1234567…',
 *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
 * });
 *
 * // items: [TokenTxHistoryItem, TokenTxHistoryItem, …]
 * ```
 */
export async function getTokenTxHistory<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount, PublicLensNetworkRpcSchema>,
  params: GetTokenTxHistoryParameters,
): Promise<GetTokenTxHistoryReturnType> {
  return client.request(
    {
      method: 'lens_getTokenTxHistory',
      params: [params],
    },
    { retryCount: 0 },
  );
}
