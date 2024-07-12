/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Account,
  Address,
  Client,
  Transport,
  parseEventLogs,
  getChainContractAddress, encodeAbiParameters, parseAbiParameters,
} from 'viem';
import { waitForTransactionReceipt, writeContract } from 'viem/actions';
import { RequestErrorType } from 'viem/utils';

import { abi } from '../abi/lensPaymasterFactory';
import { LensNetworkChain } from '../chains';

export type CreatePaymasterParameters = {
  initialOwner: string;
  payment: {
    token: string;
    amount: bigint;
  };
  withAllowlist: boolean;
  withTargetContractAllowlist: boolean;
  rateLimits: {
    globalLimit: bigint;
    userLimit: bigint;
    timeWindow: number;
  } 
}
  ;

export type CreatePaymasterReturnType = Address;

export type CreatePaymasterErrorType = RequestErrorType;

/**
 * Create a Lens Paymaster contract with the given parameters.
 *
 * @param client - Client to use
 * @param parameters - {@link CreatePaymasterParameters}
 * @returns The newly created Paymaster contract address. {@link CreatePaymasterReturnType}
 *
 * @example
 * ```ts
 * import { createWalletClient, Hex, http, privateKeyToAccount } from 'viem';
 * import { chains, createPaymaster } from '@lens-network/sdk/viem';
 *
 * const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
 *
 * const walletClient = createWalletClient({
 *   account,
 *   chain: chains.testnet,
 *   transport: http(),
 * });
 *
 * const paymasterAddress = await createPaymaster(client, {
 *   initialOwner: account.address,
 *   payment: {
 *     token: '0x…',
 *     amount: 1n,
 *   },
 *   withAllowlist: true,
 *   withTargetContractAllowlist: true,
 *   rateLimits: {
 *     globalLimit: 100n,
 *     userLimit: 10n,
 *     timeWindow: 3600,
*    }
 * });
 *
 * // paymasterAddress: 0x…
 * ```
 */
export async function createPaymaster<
  TChain extends LensNetworkChain,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount>,
  params: CreatePaymasterParameters,
): Promise<CreatePaymasterReturnType> {
  const hash = await writeContract(client, {
    address: getChainContractAddress({ chain: client.chain, contract: 'lensPaymasterFactory' }),
    abi,
    functionName: 'createPaymaster',
    args: [
      params.initialOwner,
      params.payment.token,
      params.payment.amount,
      params.withAllowlist,
      params.withTargetContractAllowlist,
      encodeAbiParameters(
        parseAbiParameters(['uint64 globalLimit', 'uint64 userLimit', 'uint32 timeWindow', 'uint256 windowStart']),
        [params.rateLimits.globalLimit, params.rateLimits.userLimit, params.rateLimits.timeWindow, BigInt(Math.floor(Date.now() / 1000 / 3600) * 3600)],
      )
],
  } as any);

  const receipt = await waitForTransactionReceipt(client, { hash });

  const logs = parseEventLogs({ abi, logs: receipt.logs });

  return logs[0]?.address as Address;
}
