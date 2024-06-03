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
 * import { getDefaultProvider, types } from '@lens-network/sdk/ethers';
 *
 * const provider = getDefaultProvider(types.Networks.Staging); // Lens Network testnet (L2)
 * const custom = getDefaultProvider('http://localhost:8545/'); // Local node
 * ```
 */
export function getDefaultProvider(network: string | Network): Provider {
  switch (network) {
    case Network.Localhost:
      return new Provider('http://localhost:4096');

    case Network.Staging:
      return new Provider(staging.rpcUrl);

    case Network.Testnet:
    case Network.Mainnet:
      invariant(false, 'Network supported yet');
  }
  return new Provider(network);
}
