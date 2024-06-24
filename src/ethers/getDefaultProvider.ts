import { Provider } from './providers';
import { Network } from './types';
import { staging } from '../chains';
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
 * const provider = getDefaultProvider(Network.Staging); // Lens Network testnet (L2)
 * ```
 */
export function getDefaultProvider(network: Network): Provider {
  switch (network) {
    case Network.Staging:
      return new Provider(staging.rpcUrl);

    case Network.Testnet:
    case Network.Mainnet:
      invariant(false, 'Network supported yet');
  }
}
