import { defineChain } from 'viem';
import { chainConfig } from 'viem/zksync';

import { stagingRpcUrl } from '../../constants';

export const sepoliaDevelopment = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 37111,
  name: 'Lens Development Network',
  network: 'lens-development-network',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: [stagingRpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: 'zkSync Explorer',
      url: 'https://explorer.staging.lens.zksync.dev/',
    },
  },
  contracts: {},
  testnet: true,
});
