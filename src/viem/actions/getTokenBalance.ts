import { Account, Chain, Client, Hex, Transport } from 'viem';
import { RequestErrorType } from 'viem/utils';

import { PublicLensNetworkRpcSchema, TokenBalanceRequest } from '../types';

export type GetTokenBalanceParameters = TokenBalanceRequest;

export type GetTokenBalanceReturnType = Hex;

export type GetTokenBalanceErrorType = RequestErrorType;

/**
 * Retrieve token balance for a given address.
 *
 * @param client - Client to use
 * @param params - {@link GetTokenBalanceParameters}
 * @returns The token balance. {@link GetTokenBalanceReturnType}
 *
 * @example
 * ```ts
 * import { createPublicClient, http } from 'viem';
 * import { chains, getTokenBalance } from '@lens-network/sdk/viem';
 *
 * const client = createPublicClient({
 *   chain: chains.staging,
 *   transport: http(),
 * });
 *
 * const balance = await getTokenBalance(client, {
 *   address: '0x1234567…',
 *   contractAddress: '0x1234567…',
 * });
 *
 * // balance: '0x10042…'
 * ```
 */
export async function getTokenBalance<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount, PublicLensNetworkRpcSchema>,
  params: GetTokenBalanceParameters,
): Promise<GetTokenBalanceReturnType> {
  return client.request(
    {
      method: 'lens_getTokenBalance',
      params: [params],
    },
    { retryCount: 0 },
  );
}
