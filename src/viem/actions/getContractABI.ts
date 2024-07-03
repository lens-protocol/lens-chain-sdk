import { Account, Chain, Client, Transport } from 'viem';
import { RequestErrorType } from 'viem/utils';

import { PublicLensNetworkRpcSchema } from '../types';

export type GetContractAbiParameters = {
  address: string;
};

export type GetContractAbiReturnType = string;

export type GetContractAbiErrorType = RequestErrorType;

/**
 * Retrieve the ABI for a given contract address.
 *
 * @param client - Client to use
 * @param params - {@link GetContractAbiParameters}
 * @returns The ABI as serialized JSON string. {@link GetContractAbiReturnType}
 *
 * @example
 * ```ts
 * import { createPublicClient, http } from 'viem';
 * import { chains, getContractABI } from '@lens-network/sdk/viem';
 *
 * const client = createPublicClient({
 *   chain: chains.testnet,
 *   transport: http(),
 * });
 *
 * const abi = await getContractABI(client, {
 *   address: '0x1234567…',
 * });
 *
 * // abi: '[ { inputs: [ … ], … }, … }'
 * ```
 */
export async function getContractABI<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount, PublicLensNetworkRpcSchema>,
  { address }: GetContractAbiParameters,
): Promise<GetContractAbiReturnType> {
  return client.request(
    {
      method: 'lens_getContractABI',
      params: [address],
    },
    { retryCount: 0 },
  );
}
