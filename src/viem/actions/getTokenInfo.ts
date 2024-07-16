import { Account, Address, Chain, Client, Transport } from 'viem';
import { RequestErrorType } from 'viem/utils';

import { PublicLensNetworkRpcSchema, TokenInfoResult } from '../types';

export type GetTokenInfoParameters = {
  address: Address;
};

export type GetTokenInfoReturnType = TokenInfoResult | null;

export type GetTokenInfoErrorType = RequestErrorType;

/**
 * Retrieve token information.
 *
 * Token price, liquidity and icon are retrieved from CoinGecko. The data is updated every 24 hours.
 *
 * @param client - Client to use
 * @param params - {@link GetTokenInfoParameters}
 * @returns The token information - {@link GetTokenInfoReturnType}
 *
 * @example
 * ```ts
 * import { createPublicClient, http } from 'viem';
 * import { chains, getContractCreation } from '@lens-network/sdk/viem';
 *
 * const client = createPublicClient({
 *   chain: chains.testnet,
 *   transport: http(),
 * });
 *
 * const result = await getTokenInfo(client, {
 *   address: '0x1234567…'
 * });
 *
 * // result: TokenInfoResult | null
 * ```
 */
export async function getTokenInfo<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount, PublicLensNetworkRpcSchema>,
  { address }: GetTokenInfoParameters,
): Promise<GetTokenInfoReturnType> {
  return client.request(
    {
      method: 'lens_getTokenInfo',
      params: [address],
    },
    { retryCount: 0 },
  );
}
