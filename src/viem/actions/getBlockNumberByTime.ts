import { Account, Chain, Client, Hex, Transport } from 'viem';
import { RequestErrorType } from 'viem/utils';

import { EpochTimeStamp, PublicLensNetworkRpcSchema } from '../types';

export type GetBlockNumberByTimeParameters = {
  /**
   * The direction to search for the block number.
   */
  closest: 'before' | 'after';
  /**
   * The timestamp to search for.
   */
  timestamp: EpochTimeStamp;
};

export type GetBlockNumberByTimeReturnType = Hex;

export type GetBlockNumberByTimeErrorType = RequestErrorType;

/**
 * Retrieve the block number closest to the given timestamp.
 *
 * @param client - Client to use
 * @param parameters - {@link GetBlockNumberByTimeParameters}
 * @returns The block number. {@link GetBlockNumberByTimeReturnType}
 *
 * @example
 * ```ts
 * import { createPublicClient, http } from 'viem';
 * import { chains, getBlockNumberByTime } from '@lens-network/sdk/viem';
 *
 * const client = createPublicClient({
 *   chain: chains.staging,
 *   transport: http(),
 * });
 *
 * const result = await getBlockNumberByTime(client, {
 *   before: 1630000000,
 * });
 *
 * // result: 0xa
 * ```
 */
export async function getBlockNumberByTime<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount, PublicLensNetworkRpcSchema>,
  { closest, timestamp }: GetBlockNumberByTimeParameters,
): Promise<GetBlockNumberByTimeReturnType> {
  return client.request(
    {
      method: 'lens_getBlockNumberByTime',
      params: [closest, timestamp],
    },
    { retryCount: 0 },
  );
}
