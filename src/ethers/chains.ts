import { toBeHex } from 'ethers/utils';

import * as chains from '../chains';
import { AddEthereumChainParameter } from '../types';

function defineAddEthereumChainParameter(chain: chains.ChainDefinition): AddEthereumChainParameter {
  return {
    chainId: toBeHex(chain.id),
    chainName: chain.name,
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: [chain.rpcUrl],
    blockExplorerUrls: [chain.blockExplorerUrl],
  };
}

export type { AddEthereumChainParameter };

export const staging = /*#__PURE__*/ defineAddEthereumChainParameter(chains.staging);

export const localhost = /*#__PURE__*/ defineAddEthereumChainParameter(chains.localhost);
