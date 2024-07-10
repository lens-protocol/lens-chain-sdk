import { Account, Address, Chain, Client, Transport } from 'viem';
import { RequestErrorType } from 'viem/utils';

import { ContractCreationAddresses } from '../../types';
import { ContractsCreationResult, PublicLensNetworkRpcSchema } from '../types';

export type GetContractCreationParameters = {
  addresses: ContractCreationAddresses<Address>;
};

export type GetContractCreationReturnType = ReadonlyArray<ContractsCreationResult>;

export type GetContractCreationErrorType = RequestErrorType;

/**
 * Retrieve contracts creation details, up to 5 at a time.
 *
 * @param client - Client to use
 * @param params - {@link GetContractCreationParameters}
 * @returns The contract creation details - {@link GetContractCreationReturnType}
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
 * const result = await getContractCreation(client, {
 *   addresses: [ '0x1234567…' ]
 * });
 *
 * // result: [ContractsCreationResult, ContractsCreationResult, …]
 * ```
 */
export async function getContractCreation<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount, PublicLensNetworkRpcSchema>,
  { addresses }: GetContractCreationParameters,
): Promise<GetContractCreationReturnType> {
  const result = await client.request(
    {
      method: 'lens_getContractCreation',
      params: addresses,
    },
    { retryCount: 0 },
  );

  return result ?? [];
}
