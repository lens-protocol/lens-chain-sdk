/**
 * TODO: Move these definitions under `viem/chains` once stable.
 */
import { Chain, ChainContract } from 'viem';
import { Assign, Prettify } from 'viem/chains';
import { defineChain } from 'viem/utils';
import { chainConfig } from 'viem/zksync';

import * as chains from '../chains';
import { nativeCurrency } from '../constants';

export type LensNetworkChain = Prettify<
  Assign<
    Chain,
    {
      contracts: {
        erc20Factory: ChainContract;
        erc721Factory: ChainContract;
      };
    }
  >
>;

function defineViemChain(chain: chains.ChainDefinition): LensNetworkChain {
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
    contracts: {
      erc20Factory: {
        address: chain.contracts.erc20Factory,
      },
      erc721Factory: {
        address: chain.contracts.erc721Factory,
      },
    },
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

export const testnet = /*#__PURE__*/ defineViemChain(chains.testnet);
