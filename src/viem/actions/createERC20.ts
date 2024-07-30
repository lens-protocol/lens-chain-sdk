/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Account, Address, Client, Transport, parseEventLogs, getChainContractAddress } from 'viem';
import { waitForTransactionReceipt, writeContract } from 'viem/actions';
import { RequestErrorType } from 'viem/utils';

import { abi } from '../abi/lensTokenFactory';
import { LensNetworkChain } from '../chains';
import { Minter } from '../types';

export type CreateERC20Parameters = {
  /**
   * A list of addresses that have admin access to the token.
   */
  admins: Address[];
  /**
   * The number of decimal places to which the token can be divided.
   */
  decimals: number;
  /**
   * The address of the icon image for the token.
   */
  iconURI: string;
  /**
   * The address of the initial owner of the token.
   */
  initialOwner: Address;
  /**
   * The max supply of the token.
   */
  maxSupply: bigint;
  /**
   * A list of addresses that have mint access to the token.
   */
  minters: Minter[];
  /**
   * The $GRASS price to mint the 1 token.
   *
   * Set to 0 if the token is not a crowdsale.
   */
  mintRate: bigint;
  /**
   * The name of the token.
   */
  name: string;
  /**
   * The symbol of the token.
   */
  symbol: string;
};

export type CreateERC20ReturnType = Address;

export type CreateERC20ErrorType = RequestErrorType;

/**
 * Create an ERC-20 contract with the given parameters.
 *
 * @param client - Client to use
 * @param parameters - {@link CreateERC20Parameters}
 * @returns The newly created ERC-20 contract address. {@link CreateERC20ReturnType}
 *
 * @example
 * ```ts
 * import { createWalletClient, Hex, http, privateKeyToAccount } from 'viem';
 * import { chains, createERC20 } from '@lens-network/sdk/viem';
 *
 * const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
 *
 * const walletClient = createWalletClient({
 *   account,
 *   chain: chains.testnet,
 *   transport: http(),
 * });
 *
 * const tokenAddress = await createERC20(client, {
 *   admins: [],
 *   decimals: 18,
 *   iconURI: 'https://example.com/icon.png',
 *   initialOwner: account.address,
 *   maxSupply: 100_000_000_000_000_000_000n,
 *   minters: [],
 *   mintRate: 0n,
 *   name: 'SDK Test Token',
 *   symbol: 'SDK',
 * });
 *
 * // tokenAddress: 0x…
 * ```
 */
export async function createERC20<
  TChain extends LensNetworkChain,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  params: CreateERC20Parameters,
): Promise<CreateERC20ReturnType> {
  const hash = await writeContract(client, {
    address: getChainContractAddress({ chain: client.chain, contract: 'tokenFactory' }),
    abi,
    functionName: 'createERC20',
    args: [params.initialOwner, params, params.admins, params.minters],
  } as any);

  const receipt = await waitForTransactionReceipt(client, { hash });

  const logs = parseEventLogs({ abi, logs: receipt.logs });

  return logs[0]?.address as Address;
}
