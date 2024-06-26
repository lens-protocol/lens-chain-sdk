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

import { abi } from '../abi/basicErc20Factory';
import { LensNetworkChain } from '../chains';

export type CreateErc20Parameters = ContractFunctionArgs<
  typeof abi,
  'nonpayable',
  'createToken'
>[0];

export type CreateErc20ReturnType = Address;

export type CreateErc20ErrorType = RequestErrorType;

/**
 * Create an ERC-20 token with the given parameters.
 *
 * @param client - Client to use
 * @param parameters - {@link CreateErc20Parameters}
 * @returns The newly created ERC-20 token address. {@link CreateErc20ReturnType}
 *
 * @example
 * ```ts
 * import { createWalletClient, Hex, http, privateKeyToAccount } from 'viem';
 * import { chains, createErc20 } from '@lens-network/sdk/viem';
 *
 * const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
 *
 * const walletClient = createWalletClient({
 *   account,
 *   chain: chains.staging,
 *   transport: http(),
 * });
 *
 * const tokenAddress = await createErc20(client, {
 *   initialOwner: account.address,
 *   initialSupply: 100_000_000_000_000_000_000n,
 *   name: 'SDK Test Token',
 *   symbol: 'SDK',
 * });
 *
 * // tokenAddress: 0x…
 * ```
 */
export async function createErc20<
  TChain extends LensNetworkChain,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  params: CreateErc20Parameters,
): Promise<CreateErc20ReturnType> {
  const hash = await writeContract(client, {
    address: getChainContractAddress({ chain: client.chain, contract: 'erc20Factory' }),
    abi,
    functionName: 'createToken',
    args: [params],
  } as any);

  const receipt = await waitForTransactionReceipt(client, { hash });

  const logs = parseEventLogs({ abi, logs: receipt.logs });

  return logs[0]?.address as Address;
}
