import { assert, Network, NetworkPlugin } from 'ethers';

import { ChainDefinition, DeployedContracts, testnet } from '../chains';

/**
 * @internal
 */
export class LensNetworkPlugin extends NetworkPlugin {
  readonly contracts: DeployedContracts;

  constructor(contracts: DeployedContracts) {
    super(LensNetworkPlugin.name);
    this.contracts = contracts;
  }

  // quite important although poorly documented
  override clone(): NetworkPlugin {
    return new LensNetworkPlugin(this.contracts);
  }

  // https://docs.ethers.org/v6/api/providers/#NetworkPlugin-name
  static name = 'xyz.lens.network.contracts';
}

/**
 * @internal
 */
export function assertLensContractsNetworkPlugin(
  plugin: NetworkPlugin | null,
): asserts plugin is LensNetworkPlugin {
  assert(
    plugin?.name === LensNetworkPlugin.name,
    `Network plugin ${LensNetworkPlugin.name} not found`,
    'UNKNOWN_ERROR',
  );
}

function networkFactoryFrom(chain: ChainDefinition) {
  return () => {
    const network = new Network(chain.name, chain.id);
    network.attachPlugin(new LensNetworkPlugin(chain.contracts));
    return network;
  };
}

// TODO: add other Lens Network chains once available
[testnet].forEach((chain) => Network.register(chain.id, networkFactoryFrom(chain)));
