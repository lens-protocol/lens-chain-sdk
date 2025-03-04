import { Provider } from './providers';
import { Network } from './types';
import { testnet } from '../chains';
import { invariant } from '../invariant';

/**
 * Returns a default provider for the `network`.
 *
 * If `network` is a string that begins with `"http:"` or `"https:"`,
 * a `Provider` is returned connected to that URL.
 *
 * @example
 * ```ts
 * import { getDefaultProvider, Network } from '@lens-network/sdk/ethers';
 *
 * const provider = getDefaultProvider(Network.Testnet); // Lens Network testnet (L2)
 * ```
 */
export function getDefaultProvider(network: Network): Provider {
  switch (network) {
    case Network.Testnet:
      return new Provider(testnet.rpcUrl);

    case Network.Mainnet:
      invariant(false, 'Lens Chain Mainnet is not supported yet');
  }
}
