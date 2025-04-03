import { Chain, ChainContract } from 'viem';
import { Assign, Prettify } from 'viem/chains';
import { defineChain } from 'viem/utils';
import { chainConfig } from 'viem/zksync';

import * as chains from '../chains';

export type LensChain = Prettify<
  Assign<
    Chain,
    {
      contracts: {
        multicall3: ChainContract;
        wrappedGasToken: ChainContract;
      };
    }
  >
>;

/**
 * @deprecated Use {@link LensChain} instead.
 */
export type LensNetworkChain = LensChain;

function defineViemChain(chain: chains.ChainDefinition): LensChain {
  return defineChain({
    ...chainConfig,
    id: chain.id,
    name: chain.name,
    network: chain.network,
    nativeCurrency: chain.nativeCurrency,
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
    contracts: {
      multicall3: {
        address: chain.contracts.multicall3,
      },
      wrappedGasToken: {
        address: chain.contracts.wrappedGasToken,
      },
    },
    testnet: chain.testnet,
    fees: {
      /**
       * Ensures walletClient.prepareTransactionRequest() does not
       * call eth_maxPriorityFeePerGas which is not supported by
       * many Wallets (i.e., MetaMask).
       *
       * This is safe because of the nature of gas on ZKsync Validium.
       */
      estimateFeesPerGas: 0n,
    },
  });
}

export const mainnet = /*#__PURE__*/ defineViemChain(chains.mainnet);
export const testnet = /*#__PURE__*/ defineViemChain(chains.testnet);
