import { JsonRpcPayload, ethers, JsonRpcError, JsonRpcResult } from 'ethers';
import * as zksync from 'zksync-ethers';

import { SendRawTransactionDetails } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

type BaseLensNetworkProvider = ethers.JsonRpcApiProvider & {
  _send(
    payload: JsonRpcPayload | Array<JsonRpcPayload>,
  ): Promise<Array<JsonRpcResult | JsonRpcError>>;
};

function LensNetworkProvider<TBase extends Constructor<BaseLensNetworkProvider>>(
  ProviderType: TBase,
) {
  return class Provider extends ProviderType {
    /**
     * Executes a transaction and returns its hash, storage logs, and events that would have
     * been generated if the transaction had already been included in the block.
     *
     * @param serializedTransaction - The serialized transaction to send.
     * @returns The [Transaction](https://viem.sh/docs/glossary/terms#transaction) hash, storage logs, and events. {@link SendRawTransactionDetails}
     */
    async sendRawTransactionWithDetailedOutput(
      serializedTransaction: string,
    ): Promise<SendRawTransactionDetails> {
      return this.send('zks_sendRawTransactionWithDetailedOutput', [
        serializedTransaction,
      ]) as Promise<SendRawTransactionDetails>;
    }

    /**
     * @deprecated Use `getDefaultProvider` from `@lens-network/sdk/ethers` instead.
     * @internal
     */
    static getDefaultProvider(_: unknown): TBase {
      throw new Error(`Use 'getDefaultProvider' from '@lens-network/sdk/ethers' instead`);
    }
  };
}

/**
 * A `Provider` extends {@link zksync.Provider} and includes additional features for interacting with the Lens Network.
 *
 * It supports RPC endpoints within the `zks` namespace.
 */
export class Provider extends LensNetworkProvider(zksync.Provider) {
  /**
   * @inheritDoc
   *
   * @example
   * ```ts
   * import { Provider, types } from '@lens-network/sdk/ethers';
   *
   * const provider = getDefaultProvider(types.Networks.Sepolia);
   *
   * const signedTransaction = '0x02f8500182031180…';
   * const result = await provider.sendRawTransactionWithDetailedOutput(signedTransaction);
   * ```
   */
  sendRawTransactionWithDetailedOutput(
    serializedTransaction: string,
  ): Promise<SendRawTransactionDetails> {
    return super.sendRawTransactionWithDetailedOutput(serializedTransaction);
  }
}

/**
 * A `BrowserProvider` extends {@link zksync.BrowserProvider} and includes additional features for interacting with the Lens Network.
 *
 * It supports RPC endpoints within the `zks` namespace.
 *
 * This provider is designed for frontend use in a browser environment and integration for browser wallets
 * (e.g., MetaMask, WalletConnect).
 */
export class BrowserProvider extends LensNetworkProvider(zksync.BrowserProvider) {
  /**
   * @inheritDoc
   *
   * @example
   * ```ts
   * import { BrowserProvider } from '@lens-network/sdk/ethers';
   *
   * const provider = new ethers.BrowserProvider(window.ethereum);
   *
   * const signedTransaction = '0x02f8500182031180…';
   * const result = await provider.sendRawTransactionWithDetailedOutput(signedTransaction);
   * ```
   */
  sendRawTransactionWithDetailedOutput(
    serializedTransaction: string,
  ): Promise<SendRawTransactionDetails> {
    return super.sendRawTransactionWithDetailedOutput(serializedTransaction);
  }
}
