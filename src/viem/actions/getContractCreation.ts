import { Account, Chain, Client, Transport } from 'viem';
import { RequestErrorType } from 'viem/utils';

import { ContractCreationAddresses } from '../../types';
import { ContractsCreationResult, PublicLensNetworkRpcSchema } from '../types';

export type GetContractCreationParameters = ContractCreationAddresses;

export type GetContractCreationReturnType = ReadonlyArray<ContractsCreationResult>;

export type GetContractCreationErrorType = RequestErrorType;

/**
 * Retrieve contracts creation details, up to 5 at a time.
 *
 * @param client - Client to use
 * @param parameters - {@link GetContractCreationParameters}
 * @returns The contract creation details - {@link GetContractCreationReturnType}
 *
 * @example
 * ```ts
 * import { createPublicClient, http } from 'viem';
 * import { chains, getContractCreation } from '@lens-network/sdk/viem';
 *
 * const client = createPublicClient({
 *   chain: chains.staging,
 *   transport: http(),
 * });
 *
 * const result = await getContractCreation(client, [
 *   '0x1234567890123456789012345678901234567890',
 * ]);
 *
 * // result: [ContractsCreationResult, ContractsCreationResult, ...]
 * ```
 */
export async function getContractCreation<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount, PublicLensNetworkRpcSchema>,
  args: GetContractCreationParameters,
): Promise<GetContractCreationReturnType> {
  const result = await client.request(
    {
      method: 'lens_getContractCreation',
      params: args,
    },
    { retryCount: 0 },
  );

  return result ?? [];
}
