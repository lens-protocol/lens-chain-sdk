import { Account, Client, Transport } from 'viem';

import {
  sendRawTransactionWithDetailedOutput,
  type SendRawTransactionWithDetailedOutputParameters,
  type SendRawTransactionWithDetailedOutputReturnType,
} from './actions/sendRawTransactionWithDetailedOutput';
import { LensNetworkChain } from './chains';


export type WalletActions = {
  /**
   * Create an ERC-20 contract with the given parameters.
   *
   * @param client - Client to use
   * @param parameters - {@link CreateErc20Parameters}
   * @returns The newly created ERC-20 contract address. {@link CreateErc20ReturnType}
   *
   * @example
   * ```ts
   * import { createWalletClient, Hex, http, privateKeyToAccount } from 'viem';
   * import { chains, walletActions } from '@lens-network/sdk/viem';
   *
   * const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
   *
   * export const walletClient = createWalletClient({
   *   account,
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(walletActions());
   *
   * const tokenAddress = await client.createErc20({
   *   initialOwner: account.address,
   *   initialSupply: 100_000_000_000_000_000_000n,
   *   name: 'SDK Test Token',
   *   symbol: 'SDK',
   * });
   *
   * // tokenAddress: 0x…
   * ```
   */
  // createErc20: (params: CreateErc20Parameters) => Promise<CreateErc20ReturnType>;
  /**
   * Create an ERC-721 contract with the given parameters.
   *
   * @param client - Client to use
   * @param parameters - {@link CreateErc20Parameters}
   * @returns The newly created ERC-721 contract address. {@link CreateErc20ReturnType}
   *
   * @example
   * ```ts
   * import { createWalletClient, Hex, http, privateKeyToAccount } from 'viem';
   * import { chains, walletActions } from '@lens-network/sdk/viem';
   *
   * const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
   *
   * export const walletClient = createWalletClient({
   *   account,
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(walletActions());
   *
   * const tokenAddress = await client.createErc721({
   *   initialOwner: account.address,
   *   maxSupply: 100n,
   *   name: 'My collection',
   *   symbol: 'SDK',
   * });
   *
   * // tokenAddress: 0x…
   * ```
   */
  // createErc721: (params: CreateErc721Parameters) => Promise<CreateErc721ReturnType>;

  /**
   * Executes a transaction and returns its hash, storage logs, and events that would have
   * been generated if the transaction had already been included in the block.
   *
   * @param params - {@link SendRawTransactionWithDetailedOutputParameters}
   * @returns The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash, storage logs, and events. {@link SendRawTransactionWithDetailedOutputReturnType}
   *
   * @example
   * ```ts
   * import { createWalletClient, Hex, http, privateKeyToAccount } from 'viem';
   * import { chains, walletActions } from '@lens-network/sdk/viem';
   *
   * const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
   *
   * export const walletClient = createWalletClient({
   *   account,
   *   chain: chains.testnet,
   *   transport: http(),
   * }).extend(walletActions());
   *
   * const result = await client.sendRawTransactionWithDetailedOutput({
   *   serializedTransaction: '0x02f8500182031180…',
   * });
   * ```
   */
  sendRawTransactionWithDetailedOutput: (
    params: SendRawTransactionWithDetailedOutputParameters,
  ) => Promise<SendRawTransactionWithDetailedOutputReturnType>;
};

export function walletActions() {
  return <
    TChain extends LensNetworkChain = LensNetworkChain,
    TAccount extends Account | undefined = Account | undefined,
  >(
    client: Client<Transport, TChain, TAccount>,
  ): WalletActions => ({
    // createErc20: (params) => createErc20(client, params),
    // createErc721: (params) => createErc721(client, params),
    sendRawTransactionWithDetailedOutput: (params) =>
      sendRawTransactionWithDetailedOutput(client, params),
  });
}
