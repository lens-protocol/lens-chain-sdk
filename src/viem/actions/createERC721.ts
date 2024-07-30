/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Account, Address, Client, Transport, parseEventLogs, getChainContractAddress } from 'viem';
import { waitForTransactionReceipt, writeContract } from 'viem/actions';
import { RequestErrorType } from 'viem/utils';

import { abi } from '../abi/lensTokenFactory';
import { LensNetworkChain } from '../chains';
import { Minter } from '../types';

export type CreateERC721Parameters = {
  /**
   * A list of addresses that have admin access to the token.
   */
  admins: Address[];
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

export type CreateERC721ReturnType = Address;

export type CreateERC721ErrorType = RequestErrorType;

/**
 * Create an ERC-721 contract with the given parameters.
 *
 * @param client - Client to use
 * @param parameters - {@link CreateERC721Parameters}
 * @returns The newly created ERC-721 contract address. {@link CreateERC721ReturnType}
 *
 * @example
 * ```ts
 * import { createWalletClient, Hex, http, privateKeyToAccount } from 'viem';
 * import { chains, createERC721 } from '@lens-network/sdk/viem';
 *
 * const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
 *
 * const walletClient = createWalletClient({
 *   account,
 *   chain: chains.testnet,
 *   transport: http(),
 * });
 *
 * const tokenAddress = await createERC721(client, {
 *   admins: [],
 *   iconURI: 'https://example.com/icon.png',
 *   initialOwner: account.address,
 *   maxSupply: 100,
 *   minters: [],
 *   mintRate: 0n,
 *   name: 'My Collection',
 *   symbol: 'SDK',
 * });
 *
 * // tokenAddress: 0x…
 * ```
 */
export async function createERC721<
  TChain extends LensNetworkChain,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  params: CreateERC721Parameters,
): Promise<CreateERC721ReturnType> {
  const hash = await writeContract(client, {
    address: getChainContractAddress({ chain: client.chain, contract: 'tokenFactory' }),
    abi,
    functionName: 'createERC721',
    args: [params.initialOwner, params, params.admins, params.minters],
  } as any);

  const receipt = await waitForTransactionReceipt(client, { hash });

  const logs = parseEventLogs({ abi, logs: receipt.logs });

  return logs[0]?.address as Address;
}
