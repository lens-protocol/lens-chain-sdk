import { ethers } from 'ethers';
import * as zksync from 'zksync-ethers';

import { Provider } from './providers';

export type Erc20TokenParams = {
  initialOwner: string;
  initialSupply: ethers.BigNumberish;
  name: string;
  symbol: string;
};

export type Erc721TokenParams = {
  initialOwner: string;
  maxSupply: ethers.BigNumberish;
  name: string;
  symbol: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T = object> = new (...args: any[]) => T;

type L2TxSender = {
  sendTransaction(tx: ethers.TransactionRequest): Promise<ethers.TransactionResponse>;

  getAddress(): Promise<string>;

  _signerL2(): ethers.Signer;

  _providerL2(): zksync.Provider;
};

function Adapter<TBase extends Constructor<L2TxSender>>(Base: TBase) {
  return class LensNetworkAdapter extends Base {};
}

/**
 * A `Wallet` is an extension of {@link zksync.Wallet} with additional features for interacting with Lens Network.
 * It facilitates bridging assets between different networks.
 * All transactions must originate from the address corresponding to the provided private key.
 */
export class Wallet extends Adapter(zksync.Wallet) {
  override connect(provider: Provider) {
    return super.connect(provider);
  }
}

/**
 * A `Signer` is designed for frontend use with browser wallet injection (e.g., MetaMask),
 * providing only Lens Network (L2) operations.
 *
 * @see {@link zksync.L1Signer} for L1 operations.
 */
export class Signer extends Adapter(zksync.Signer) {
  /**
   * Creates a new Singer with provided `signer` and `chainId`.
   *
   * @param signer The signer from browser wallet.
   * @param chainId The chain ID of the network.
   * @param lensProvider The provider instance for connecting to the Lens Network. If not provided,
   * the methods from the `zks` and `lens` namespace are not supported, and interaction with them
   * will result in an error.
   *
   * @example
   * ```ts
   * import { BrowserProvider, getDefaultProvider, Network } from '@lens-network/sdk/ethers';
   *
   * const browserProvider = new BrowserProvider(window.ethereum);
   * const lensProvider = getDefaultProvider(Network.Testnet);
   *
   * const network = await browserProvider.getNetwork();
   *
   * const signer = Signer.from(
   *   await browserProvider.getSigner(),
   *   Number(network.chainId),
   *   lensProvider,
   * );
   * ```
   */
  static override from(
    signer: ethers.JsonRpcSigner & {
      provider: Provider;
    },
    chainId: number,
    lensProvider?: Provider,
  ): Signer {
    const zkSigner = super.from(signer, chainId, lensProvider);
    return Object.setPrototypeOf(zkSigner, Signer.prototype) as Signer;
  }
}
