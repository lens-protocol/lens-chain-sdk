import { JsonRpcPayload, ethers, JsonRpcError, JsonRpcResult } from 'ethers';
import * as zksync from 'zksync-ethers';

import { ContractCreationResponse, SendRawTransactionDetails, TxHistoryResponse } from './types';
import {
  ContractCreationAddresses,
  SecondsSinceEpoch,
  TimeDirection,
  TxHistoryRequest,
} from '../types';

export type { ContractCreationAddresses, TxHistoryRequest };

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
     * Retrieve contracts creation details, up to 5 at a time.
     *
     * @param addresses - The addresses of the contracts to retrieve.
     * @returns The contracts creation details.
     */
    async getContractCreation(
      addresses: ContractCreationAddresses,
    ): Promise<ContractCreationResponse> {
      const result = (await this.send(
        'lens_getContractCreation',
        addresses,
      )) as ContractCreationResponse | null;

      return result ?? [];
    }
    /**
     * Retrieve transactions for a given address.
     */
    async getTxHistory(request: TxHistoryRequest): Promise<TxHistoryResponse> {
      return this.send('lens_getTxHistory', [request]) as Promise<TxHistoryResponse>;
    }
    /**
     * Retrieve the block number closest to the given timestamp.
     *
     * @param closest - The direction to search for the block.
     * @param timestamp - The timestamp, in seconds, from which to search for the block.
     * @returns The block number as an hexadecimal string.
     */
    async getBlockNumberByTime(
      closest: TimeDirection,
      timestamp: SecondsSinceEpoch,
    ): Promise<string> {
      return this.send('lens_getBlockNumberByTime', [closest, timestamp]) as Promise<string>;
    }
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
   * const provider = getDefaultProvider(types.Networks.Staging);
   *
   * const [result] = await provider.getContractCreation([
   *  '0x175a469603aa24ee4ef1f9b0b609e3f0988668b1'
   * ]);
   * ```
   */
  getContractCreation(addresses: ContractCreationAddresses): Promise<ContractCreationResponse> {
    return super.getContractCreation(addresses);
  }
  /**
   * @inheritDoc
   *
   * @example
   * ```ts
   * import { Provider, types } from '@lens-network/sdk/ethers';
   *
   * const provider = getDefaultProvider(types.Networks.Staging);
   *
   * const { items } = await provider.getTxHistory({
   *   address: '0x...',
   * });
   */
  getTxHistory(request: TxHistoryRequest): Promise<TxHistoryResponse> {
    return super.getTxHistory(request);
  }
  /**
   * @inheritDoc
   *
   * @example
   * ```ts
   * import { Provider, types } from '@lens-network/sdk/ethers';
   *
   * const provider = getDefaultProvider(types.Networks.Staging);
   *
   * const blockNumber = await provider.getBlockNumberByTime('before', 1630000000);
   * ```
   */
  getBlockNumberByTime(closest: TimeDirection, timestamp: SecondsSinceEpoch): Promise<string> {
    return super.getBlockNumberByTime(closest, timestamp);
  }
  /**
   * @inheritDoc
   *
   * @example
   * ```ts
   * import { Provider, types } from '@lens-network/sdk/ethers';
   *
   * const provider = getDefaultProvider(types.Networks.Staging);
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
   * const [result] = await provider.getContractCreation([
   *  '0x175a469603aa24ee4ef1f9b0b609e3f0988668b1'
   * ]);
   * ```
   */
  getContractCreation(addresses: ContractCreationAddresses): Promise<ContractCreationResponse> {
    return super.getContractCreation(addresses);
  }
  /**
   * @inheritDoc
   *
   * @example
   * ```ts
   * import { BrowserProvider } from '@lens-network/sdk/ethers';
   *
   * const provider = new ethers.BrowserProvider(window.ethereum);
   *
   * const { items } = await provider.getTxHistory({
   *   address: '0x...',
   * });
   * ```
   */
  getTxHistory(request: TxHistoryRequest): Promise<TxHistoryResponse> {
    return super.getTxHistory(request);
  }
  /**
   * @inheritDoc
   *
   * @example
   * ```ts
   * import { BrowserProvider } from '@lens-network/sdk/ethers';
   *
   * const provider = new ethers.BrowserProvider(window.ethereum);
   *
   * const blockNumber = await provider.getBlockNumberByTime('before', 1630000000);
   * ```
   */
  getBlockNumberByTime(closest: TimeDirection, timestamp: SecondsSinceEpoch): Promise<string> {
    return super.getBlockNumberByTime(closest, timestamp);
  }
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
