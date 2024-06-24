import { ethers, assert, EventLog, Network } from 'ethers';
import * as zksync from 'zksync-ethers';

import { assertLensContractsNetworkPlugin, LensNetworkPlugin } from './networks';
import { Provider } from './providers';
import { factories } from './typechain';

export type Erc20TokenParams = {
  initialOwner: string;
  initialSupply: ethers.BigNumberish;
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
  return class LensNetworkAdapter extends Base {
    /**
     * Create an ERC-20 token with the given parameters.
     *
     * @params params - The parameters to create the ERC-20 token.
     * @returns The ERC-20 contract address.
     */
    async createErc20(params: Erc20TokenParams): Promise<string> {
      const { chainId } = await this._providerL2().getNetwork();

      const plugin = Network.from(chainId)?.getPlugin(LensNetworkPlugin.name);

      assertLensContractsNetworkPlugin(plugin);

      const contract = factories.BasicErc20Factory__factory.connect(
        plugin.contracts.erc20Factory,
        this._signerL2(),
      );

      const tx = await contract.createToken(params);

      const receipt = await tx.wait();

      assert(receipt !== null, 'Transaction failed', 'NETWORK_ERROR');

      const eventLog = receipt.logs.find((log) => log.address === plugin.contracts.erc20Factory);

      assert(eventLog instanceof EventLog, 'Event log not found', 'NETWORK_ERROR');

      const iface = factories.BasicErc20Factory__factory.createInterface();
      const decodedLog = iface.parseLog(eventLog);

      assert(decodedLog?.name === 'TokenCreated', 'Token not created', 'NETWORK_ERROR');

      return decodedLog.args.tokenAddress as string;
    }
  };
}

/**
 * A `Wallet` is an extension of {@link zksync.Wallet} with additional features for interacting with Lens Network.
 * It facilitates bridging assets between different networks.
 * All transactions must originate from the address corresponding to the provided private key.
 */
export class Wallet extends Adapter(zksync.Wallet) {
  /**
   * @inheritdoc
   *
   * @example
   * ```ts
   * import { getDefaultProvider, Network, Wallet } from '@lens-network/sdk/ethers';
   *
   * const provider = getDefaultProvider(Network.Staging);
   *
   * const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
   *
   * const address = await wallet.createErc20({
   *   initialOwner: wallet.address,
   *   initialSupply: 100_000_000_000_000_000_000n,
   *   name: 'SDK Test Token',
   *   symbol: 'SDK',
   * });
   * ```
   */
  override createErc20(params: Erc20TokenParams): Promise<string> {
    return super.createErc20(params);
  }
  /**
   * Connects to the Lens Network using `provider`.
   *
   * @param provider The provider instance for connecting to an L2 network.
   *
   * @see {@link connectToL1} in order to connect to L1 network.
   *
   * @example
   * ```ts
   * import { getDefaultProvider, Network, Wallet } from '@lens-network/sdk/ethers';
   *
   * const unconnectedWallet = new Wallet(process.env.PRIVATE_KEY,
   *
   * const provider = getDefaultProvider(Network.Staging);
   * const wallet = unconnectedWallet.connect(provider);
   * ```
   */
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
   * @inheritdoc
   *
   * @example
   * ```ts
   * import { getDefaultProvider, Network, Wallet } from '@lens-network/sdk/ethers';
   *
   * const provider = getDefaultProvider(Network.Staging);
   *
   * const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
   *
   * const address = await wallet.createErc20({
   *   initialOwner: wallet.address,
   *   initialSupply: 100_000_000_000_000_000_000n,
   *   name: 'SDK Test Token',
   *   symbol: 'SDK',
   * });
   * ```
   */
  override createErc20(params: Erc20TokenParams): Promise<string> {
    return super.createErc20(params);
  }
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
   * import { BrowserProvider, Network } from '@lens-network/sdk/ethers';
   *
   * const browserProvider = new BrowserProvider(window.ethereum);
   * const lensProvider = getDefaultProvider(Network.Staging);
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
