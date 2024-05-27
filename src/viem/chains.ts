/**
 * TODO: Move these definitions under `viem/chains` once stable.
 */
import { defineChain } from 'viem';
import { chainConfig } from 'viem/zksync';

import * as chains from '../chains';
import { nativeCurrency } from '../constants';

function defineViemChain(chain: chains.ChainDefinition) {
  return defineChain({
    ...chainConfig,
    id: chain.id,
    name: chain.name,
    network: chain.network,
    nativeCurrency: nativeCurrency,
    rpcUrls: {
      default: {
        http: [chain.rpcUrl],
      },
    },
    blockExplorers: {
      default: {
        name: `${chain.name} Explorer`,
        url: chain.blockExplorerUrl,
      },
    },
    contracts: {},
    testnet: true,
  });
}

export const staging = /*#__PURE__*/ defineViemChain(chains.staging);
