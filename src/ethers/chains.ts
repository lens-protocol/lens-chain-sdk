import { toBeHex } from 'ethers/utils';

import * as chains from '../chains';
import { nativeCurrency } from '../constants';
import { AddEthereumChainParameter } from '../types';

function defineAddEthereumChainParameter(chain: chains.ChainDefinition): AddEthereumChainParameter {
  return {
    chainId: toBeHex(chain.id),
    chainName: chain.name,
    nativeCurrency,
    rpcUrls: [chain.rpcUrl],
    blockExplorerUrls: [chain.blockExplorerUrl],
  };
}

export type { AddEthereumChainParameter };

export const testnet = /*#__PURE__*/ defineAddEthereumChainParameter(chains.testnet);
