import { ethers, assert, EventLog, Network } from 'ethers';
import * as zksync from 'zksync-ethers';

import { assertLensContractsNetworkPlugin, LensNetworkPlugin } from './networks';
import { Provider } from './providers';
import { factories } from './typechain';

/**
 * A token minter address with a label.
 */
export type Minter = {
  addr: string;
  label: string;
};

export type Erc20TokenParams = {
  /**
   * A list of addresses that have admin access to the token.
   */
  admins: string[];
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
  initialOwner: string;
  /**
   * The max supply of the token.
   */
  maxSupply: ethers.BigNumberish;
  /**
   * A list of addresses that have mint access to the token.
   */
  minters: Minter[];
  /**
   * The $GRASS price to mint the 1 token.
   *
   * Set to 0 if the token is not a crowdsale.
   */
  mintRate: ethers.BigNumberish;
  /**
   * The name of the token.
   */
  name: string;
  /**
   * The symbol of the token.
   */
  symbol: string;
};

export type Erc721TokenParams = {
  /**
   * A list of addresses that have admin access to the token.
   */
  admins: string[];
  /**
   * The address of the icon image for the token.
   */
  iconURI: string;
  /**
   * The address of the initial owner of the token.
   */
  initialOwner: string;
  /**
   * The max supply of the token.
   */
  maxSupply: ethers.BigNumberish;
  /**
   * A list of addresses that have mint access to the token.
   */
  minters: Minter[];
  /**
   * The $GRASS price to mint the 1 token.
   *
   * Set to 0 if the token is not a crowdsale.
   */
  mintRate: ethers.BigNumberish;
  /**
   * The name of the token.
   */
  name: string;
  /**
   * The symbol of the token.
   */
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
     * Create an ERC-20 contract with the given parameters.
     *
     * @params params - The parameters to create the ERC-20 contract.
     * @returns The ERC-20 contract address.
     */
    async createERC20(params: Erc20TokenParams): Promise<string> {
      const factory = await this.tokenFactory();

      const tx = await factory.createERC20(
        params.initialOwner,
        params,
        params.admins,
        params.minters,
      );

      const receipt = await tx.wait();

      assert(receipt !== null, 'Transaction failed', 'NETWORK_ERROR');

      const address = await factory.getAddress();
      const eventLog = receipt.logs.find((log) => log.address === address);

      assert(eventLog instanceof EventLog, 'Event log not found', 'NETWORK_ERROR');

      const decodedLog = factory.interface.parseLog(eventLog);

      assert(decodedLog?.name === 'Lens_Token_ERC20Created', 'Token not created', 'NETWORK_ERROR');

      return decodedLog.args.tokenAddress as string;
    }
    /**
     * Create an ERC-721 contract with the given parameters.
     *
     * @params params - The parameters to create the ERC-721 contract.
     * @returns The ERC-721 contract address.
     */
    async createERC721(params: Erc721TokenParams): Promise<string> {
      const factory = await this.tokenFactory();

      const tx = await factory.createERC721(
        params.initialOwner,
        params,
        params.admins,
        params.minters,
      );

      const receipt = await tx.wait();

      assert(receipt !== null, 'Transaction failed', 'NETWORK_ERROR');

      const address = await factory.getAddress();
      const eventLog = receipt.logs.find((log) => log.address === address);

      assert(eventLog instanceof EventLog, 'Event log not found', 'NETWORK_ERROR');

      const decodedLog = factory.interface.parseLog(eventLog);

      assert(decodedLog?.name === 'Lens_Token_ERC721Created', 'Token not created', 'NETWORK_ERROR');

      return decodedLog.args.tokenAddress as string;
    }

    /**
     * @internal
     */
    async tokenFactory() {
      const { chainId } = await this._providerL2().getNetwork();

      const plugin = Network.from(chainId)?.getPlugin(LensNetworkPlugin.name);

      assertLensContractsNetworkPlugin(plugin);

      return factories.LensTokenFactory__factory.connect(
        plugin.contracts.tokenFactory,
        this._signerL2(),
      );
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
   * const provider = getDefaultProvider(Network.Testnet);
   *
   * const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
   *
   * const address = await wallet.createERC20({
   *   admins: [],
   *   decimals: 18,
   *   iconURI: 'https://example.com/icon.png',
   *   initialOwner: wallet.address,
   *   maxSupply: 100_000_000_000_000_000_000n,
   *   minters: [],
   *   mintRate: 0n,
   *   name: 'SDK Test Token',
   *   symbol: 'SDK',
   * });
   * ```
   */
  override createERC20(params: Erc20TokenParams): Promise<string> {
    return super.createERC20(params);
  }
  /**
   * @inheritdoc
   *
   * @example
   * ```ts
   * import { getDefaultProvider, Network, Wallet } from '@lens-network/sdk/ethers';
   *
   * const provider = getDefaultProvider(Network.Testnet);
   *
   * const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
   *
   * const address = await wallet.createERC721({
   *   admins: [],
   *   iconURI: 'https://example.com/icon.png',
   *   initialOwner: wallet.address,
   *   maxSupply: 100,
   *   minters: [],
   *   mintRate: 0n,
   *   name: 'My Collection',
   *   symbol: 'SDK',
   * });
   * ```
   */
  override createERC721(params: Erc721TokenParams): Promise<string> {
    return super.createERC721(params);
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
   * const provider = getDefaultProvider(Network.Testnet);
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
   *
   * const address = await signer.createERC20({
   *   admins: [],
   *   decimals: 18,
   *   iconURI: 'https://example.com/icon.png',
   *   initialOwner: signer.address,
   *   maxSupply: 100_000_000_000_000_000_000n,
   *   minters: [],
   *   mintRate: 0n,
   *   name: 'SDK Test Token',
   *   symbol: 'SDK',
   * });
   * ```
   */
  override createERC20(params: Erc20TokenParams): Promise<string> {
    return super.createERC20(params);
  }
  /**
   * @inheritdoc
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
   *
   * const address = await signer.createERC721({
   *   admins: [],
   *   iconURI: 'https://example.com/icon.png',
   *   initialOwner: signer.address,
   *   maxSupply: 100,
   *   minters: [],
   *   mintRate: 0n,
   *   name: 'My Collection',
   *   symbol: 'SDK',
   * });
   * ```
   */
  override createERC721(params: Erc721TokenParams): Promise<string> {
    return super.createERC721(params);
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
