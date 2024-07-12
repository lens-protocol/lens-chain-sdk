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

export type Erc721TokenParams = {
  initialOwner: string;
  maxSupply: ethers.BigNumberish;
  name: string;
  symbol: string;
};

export type PaymasterParams = {
  initialOwner: string;
  payment: {
    token: string;
    amount: ethers.BigNumberish;
  };
  withAllowlist: boolean;
  withTargetContractAllowlist: boolean;
  rateLimits: {
    globalLimit: ethers.BigNumberish;
    userLimit: ethers.BigNumberish;
    timeWindow: number;
  }
}

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
    async createErc20(params: Erc20TokenParams): Promise<string> {
      const { chainId } = await this._providerL2().getNetwork();

      const plugin = Network.from(chainId)?.getPlugin(LensNetworkPlugin.name);

      assertLensContractsNetworkPlugin(plugin);

      const contract = factories.Erc20Factory__factory.connect(
        plugin.contracts.erc20Factory,
        this._signerL2(),
      );

      const tx = await contract.createToken(params);

      const receipt = await tx.wait();

      assert(receipt !== null, 'Transaction failed', 'NETWORK_ERROR');

      const eventLog = receipt.logs.find((log) => log.address === plugin.contracts.erc20Factory);

      assert(eventLog instanceof EventLog, 'Event log not found', 'NETWORK_ERROR');

      const decodedLog = contract.interface.parseLog(eventLog);

      assert(decodedLog?.name === 'TokenCreated', 'Token not created', 'NETWORK_ERROR');

      return decodedLog.args.tokenAddress as string;
    }
    /**
     * Create an ERC-721 contract with the given parameters.
     *
     * @params params - The parameters to create the ERC-721 contract.
     * @returns The ERC-721 contract address.
     */
    async createErc721(params: Erc721TokenParams): Promise<string> {
      const { chainId } = await this._providerL2().getNetwork();

      const plugin = Network.from(chainId)?.getPlugin(LensNetworkPlugin.name);

      assertLensContractsNetworkPlugin(plugin);

      const contract = factories.Erc721Factory__factory.connect(
        plugin.contracts.erc721Factory,
        this._signerL2(),
      );

      const tx = await contract.createToken(params);

      const receipt = await tx.wait();

      assert(receipt !== null, 'Transaction failed', 'NETWORK_ERROR');

      const eventLog = receipt.logs.find((log) => log.address === plugin.contracts.erc721Factory);

      assert(eventLog instanceof EventLog, 'Event log not found', 'NETWORK_ERROR');

      const decodedLog = contract.interface.parseLog(eventLog);

      assert(decodedLog?.name === 'TokenCreated', 'Token not created', 'NETWORK_ERROR');

      return decodedLog.args.tokenAddress as string;
    }

    /**
     * Create a paymaster contract with the given parameters.
     * The paymaster contract comes with support for the following features:
     *   - Payment with ERC20 - the sponsored txns can be free or paid with an ERC20 token.
     *   - Allowlist - permits sponsoring transactions only for specific addresses.
     *     Enabled during contract creation.
     *   - Blocklist - prevents sponsoring transactions for specific addresses.
     *   - Admin list - a list of addresses that can manage the paymaster.
     *   - Validation bypassing - a list of addresses that can bypass rate limiting validations.
     *   - Target Contract Allowlist - permits sponsoring transactions only to specific contracts.
     *     Enabled during contract creation.
     *   - Rate Limits - restricts the number of transactions a user can sponsor within a given
     *     time window. Rate limiting can be global (ie. rate limiting the total number of sponsored
     *     txns per time window) or per user. The time window is specified in seconds.
     *   - Pausing - allows the paymaster owner and admins to pause and unpause the paymaster contract.
     *
     * @params params - The parameters to create the paymaster contract.
     * @returns The paymaster contract address.
     *
     */
    async createPaymaster(params: PaymasterParams): Promise<string> {
      const { chainId } = await this._providerL2().getNetwork();

      const plugin = Network.from(chainId)?.getPlugin(LensNetworkPlugin.name);

      assertLensContractsNetworkPlugin(plugin);

      const contract = factories.LensPaymasterFactory__factory.connect(
        plugin.contracts.paymasterFactory,
        this._signerL2(),
      );

      const tx = await contract.createPaymaster(
        params.initialOwner,
        params.payment.token,
        params.payment.amount,
        params.withAllowlist,
        params.withTargetContractAllowlist,
        ethers.AbiCoder.defaultAbiCoder().encode(
          ['uint64', 'uint64', 'uint32', 'uint256'],
          Object.values({
            ...params.rateLimits,
            windowStart: Math.floor(Date.now() / 1000 / 3600) * 3600, // beginning of this hour
          }),
        )
      );

      const receipt = await tx.wait();

      assert(receipt !== null, 'Transaction failed', 'NETWORK_ERROR');

      const eventLog = receipt.logs.find((log) => log.address === plugin.contracts.paymasterFactory);

      assert(eventLog instanceof EventLog, 'Event log not found', 'NETWORK_ERROR');

      const decodedLog = contract.interface.parseLog(eventLog);

      assert(decodedLog?.name === 'LensPaymasterCreated', 'Paymaster not created', 'NETWORK_ERROR');

      return decodedLog.args._paymaster as string;
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
   * const address = await wallet.createErc721({
   *   initialOwner: wallet.address,
   *   maxSupply: 100,
   *   name: 'My Collection',
   *   symbol: 'SDK',
   * });
   * ```
   */
  override createErc721(params: Erc721TokenParams): Promise<string> {
    return super.createErc721(params);
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
   * const address = await wallet.createPaymaster({
   *   initialOwner: wallet.address,
   *   payment: {
   *     token: '0x1234567890123456789012345678901234567890',
   *     amount: 1,
   *   },
   *   withAllowlist: true,
   *   withTargetContractAllowlist: true,
   *   rateLimits: {
   *     globalLimit: 100,
   *     userLimit: 10,
   *     timeWindow: 3600,
   *   }
   * });
   * ```
   */
  override createPaymaster(params: PaymasterParams): Promise<string> {
    return super.createPaymaster(params);
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
   * const address = await signer.createErc20({
   *   initialOwner: signer.address,
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
   * const address = await signer.createErc721({
   *   initialOwner: signer.address,
   *   maxSupply: 100,
   *   name: 'My Collection',
   *   symbol: 'SDK',
   * });
   * ```
   */
  override createErc721(params: Erc721TokenParams): Promise<string> {
    return super.createErc721(params);
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
   * const address = await signer.createPaymaster({
   * initialOwner: signer.address,
   * payment: {
   *   token: '0x1234567890123456789012345678901234567890',
   *   amount: 1,
   *   },
   *   withAllowlist: true,
   *   withTargetContractAllowlist: true,
   *   rateLimits: {
   *     globalLimit: 100,
   *     userLimit: 10,
   *     timeWindow: 3600,
   *   }
   * });
   * @param params
   */
  override async createPaymaster(params: PaymasterParams): Promise<string> {
    return super.createPaymaster(params);
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
