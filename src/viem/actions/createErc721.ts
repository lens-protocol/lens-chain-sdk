/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ContractFunctionArgs,
  Account,
  Address,
  Client,
  Transport,
  parseEventLogs,
  getChainContractAddress,
} from 'viem';
import { waitForTransactionReceipt, writeContract } from 'viem/actions';
import { RequestErrorType } from 'viem/utils';

import { abi } from '../abi/erc721Factory';
import { LensNetworkChain } from '../chains';

export type CreateErc721Parameters = ContractFunctionArgs<
  typeof abi,
  'nonpayable',
  'createToken'
>[0];

export type CreateErc721ReturnType = Address;

export type CreateErc721ErrorType = RequestErrorType;

/**
 * Create an ERC-721 contract with the given parameters.
 *
 * @param client - Client to use
 * @param parameters - {@link CreateErc721Parameters}
 * @returns The newly created ERC-721 contract address. {@link CreateErc721ReturnType}
 *
 * @example
 * ```ts
 * import { createWalletClient, Hex, http, privateKeyToAccount } from 'viem';
 * import { chains, createErc721 } from '@lens-network/sdk/viem';
 *
 * const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
 *
 * const walletClient = createWalletClient({
 *   account,
 *   chain: chains.staging,
 *   transport: http(),
 * });
 *
 * const tokenAddress = await createErc721(client, {
 *   initialOwner: account.address,
 *   maxSupply: 100n,
 *   name: 'My collection',
 *   symbol: 'SDK',
 * });
 *
 * // tokenAddress: 0x…
 * ```
 */
export async function createErc721<
  TChain extends LensNetworkChain,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  params: CreateErc721Parameters,
): Promise<CreateErc721ReturnType> {
  const hash = await writeContract(client, {
    address: getChainContractAddress({ chain: client.chain, contract: 'erc721Factory' }),
    abi,
    functionName: 'createToken',
    args: [params],
  } as any);

  const receipt = await waitForTransactionReceipt(client, { hash });

  const logs = parseEventLogs({ abi, logs: receipt.logs });

  return logs[0]?.address as Address;
}
