/**
 * TODO: Move these definitions under `viem/chains` once stable.
 */
import { defineChain } from 'viem/utils';
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
    testnet: chain.testnet,
    fees: {
      /**
       * Ensures walletClient.prepareTransactionRequest() does not
       * call eth_maxPriorityFeePerGas which is not supported by
       * many Wallets (i.e., MetaMask).
       *
       * This is safe because of the nature of gas on zkSync Validium.
       */
      estimateFeesPerGas: 0n,
    },
  });
}

export const staging = /*#__PURE__*/ defineViemChain(chains.staging);

export const localhost = /*#__PURE__*/ defineViemChain(chains.localhost);
