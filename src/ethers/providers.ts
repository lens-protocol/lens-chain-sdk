import { JsonRpcPayload, ethers, JsonRpcError, JsonRpcResult } from 'ethers';
import * as zksync from 'zksync-ethers';

import {
  ContractCreationResponse,
  SendRawTransactionDetails,
  TokenInfoResult,
  TokenTxHistoryResponse,
  TxHistoryResponse,
} from './types';
import {
  ContractCreationAddresses,
  SecondsSinceEpoch,
  TimeDirection,
  TokenTxHistoryRequest,
  TxHistoryRequest,
} from '../types';

export type { ContractCreationAddresses, TxHistoryRequest, TokenTxHistoryRequest };

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
     * Retrieve token balance for a given address.
     *e
     * @param address - The address to retrieve the balance for.
     * @param contractAddress - The contract address of the token.
     * @returns The token balance. {@link GetTokenBalanceReturnType}
     */
    getTokenBalance(address: string, contractAddress: string): Promise<string> {
      return this.send('lens_getTokenBalance', [{ address, contractAddress }]) as Promise<string>;
    }
    /**
     * Retrieve the ABI for a given contract address.
     *
     * @param address - The address of the contract.
     * @returns The ABI as serialized JSON string.
     */
    getContractABI(address: string): Promise<string | null> {
      return this.send('lens_getContractABI', [address]) as Promise<string | null>;
    }
    /**
     * Retrieve token transfers for a given address with ability to filter by token address.
     *
     * @param request - The request object.
     * @returns The transactions for the given address.
     */
    getTokenTxHistory(request: TokenTxHistoryRequest): Promise<TokenTxHistoryResponse> {
      return this.send('lens_getTokenTxHistory', [request]) as Promise<TokenTxHistoryResponse>;
    }
    /**
     * Retrieve NFT transfers for a given address with ability to filter by token address.
     *
     * @param request - The request object.
     * @returns The transactions for the given address.
     */
    getNftTxHistory(request: TokenTxHistoryRequest): Promise<TokenTxHistoryResponse> {
      return this.send('lens_getNftTxHistory', [request]) as Promise<TokenTxHistoryResponse>;
    }
    /**
     * Retrieve token information.
     *
     * Token price, liquidity and icon are retrieved from CoinGecko. The data is updated every 24 hours.
     *
     * @param address - The address of the token.
     * @returns The token information
     */
    getTokenInfo(address: string): Promise<TokenInfoResult | null> {
      return this.send('lens_getTokenInfo', [address]) as Promise<TokenInfoResult | null>;
    }
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
     *
     * @param request - The request object.
     * @returns The transactions for the given address.
     */
    async getTxHistory(request: TxHistoryRequest): Promise<TxHistoryResponse> {
      return this.send('lens_getTxHistory', [request]) as Promise<TxHistoryResponse>;
    }
    /**
     * Retrieve the block number closest to the given timestamp.
     *
     * @param closest - The direction to search for the block.
     * @param timestamp - The timestamp, in seconds, from which to search for the block.
     * @returns The block number as an hexadecimal string or null if not found.
     */
    async getBlockNumberByTime(
      closest: TimeDirection,
      timestamp: SecondsSinceEpoch,
    ): Promise<string | null> {
      return this.send('lens_getBlockNumberByTime', [closest, timestamp]) as Promise<string | null>;
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
   * const provider = getDefaultProvider(types.Network.Staging);
   *
   * const balance = await provider.getTokenBalance('0x1234567…', '0x1234567…');
   * ```
   */
  getTokenBalance(address: string, contractAddress: string): Promise<string> {
    return super.getTokenBalance(address, contractAddress);
  }
  /**
   * @inheritDoc
   *
   * @example
   * ```ts
   * import { Provider, types } from '@lens-network/sdk/ethers';
   *
   * const provider = getDefaultProvider(types.Network.Staging);
   *
   * const abi = await provider.getContractABI('0x123456…');
   * ```
   */
  getContractABI(address: string): Promise<string | null> {
    return super.getContractABI(address);
  }
  /**
   * @inheritDoc
   *
   * @example
   * ```ts
   * import { Provider, types } from '@lens-network/sdk/ethers';
   *
   * const provider = getDefaultProvider(types.Network.Staging);
   *
   * const result = await provider.getTokenTxHistory({
   *   address: '0x…',
   *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
   * });
   * ```
   */
  getTokenTxHistory(request: TokenTxHistoryRequest): Promise<TokenTxHistoryResponse> {
    return super.getTokenTxHistory(request);
  }
  /**
   * @inheritDoc
   *
   * @example
   * ```ts
   * import { Provider, types } from '@lens-network/sdk/ethers';
   *
   * const provider = getDefaultProvider(types.Network.Staging);
   *
   * const result = await provider.getNftTxHistory({
   *   address: '0x…',
   *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
   * });
   * ```
   */
  getNftTxHistory(request: TokenTxHistoryRequest): Promise<TokenTxHistoryResponse> {
    return super.getNftTxHistory(request);
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
   * const result = await provider.getTokenInfo('0x175a469603aa24ee4ef1f9b0b609e3f0988668b1');
   * ```
   */
  getTokenInfo(address: string): Promise<TokenInfoResult | null> {
    return super.getTokenInfo(address);
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
   *   address: '0x…',
   *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
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
  getBlockNumberByTime(
    closest: TimeDirection,
    timestamp: SecondsSinceEpoch,
  ): Promise<string | null> {
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
   * const balance = await provider.getTokenBalance('0x1234567…', '0x1234567…');
   * ```
   */
  getTokenBalance(address: string, contractAddress: string): Promise<string> {
    return super.getTokenBalance(address, contractAddress);
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
   * const abi = await provider.getContractABI('0x123456…');
   * ```
   */
  getContractABI(address: string): Promise<string | null> {
    return super.getContractABI(address);
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
   * const result = await provider.getTokenTxHistory({
   *   address: '0x…',
   *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
   * });
   * ```
   */
  getTokenTxHistory(request: TokenTxHistoryRequest): Promise<TokenTxHistoryResponse> {
    return super.getTokenTxHistory(request);
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
   * const result = await provider.getNftTxHistory({
   *   address: '0x…',
   *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
   * });
   * ```
   */
  getNftTxHistory(request: TokenTxHistoryRequest): Promise<TokenTxHistoryResponse> {
    return super.getNftTxHistory(request);
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
   * const result = await provider.getTokenInfo('0x175a469603aa24ee4ef1f9b0b609e3f0988668b1');
   * ```
   */
  getTokenInfo(address: string): Promise<TokenInfoResult | null> {
    return super.getTokenInfo(address);
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
   *   address: '0x…',
   *   pageInfo: { page: 1, limit: 10, sort: 'asc' },
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
  getBlockNumberByTime(
    closest: TimeDirection,
    timestamp: SecondsSinceEpoch,
  ): Promise<string | null> {
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
