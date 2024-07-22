import { getDefaultProvider, Network, Wallet } from '@lens-network/sdk/ethers';
import { ethers } from 'ethers';
import { utils } from 'zksync-ethers';

// Lens Network (L2)
export const lensProvider = getDefaultProvider(Network.Testnet);

// Ethereum L1
export const ethProvider = ethers.getDefaultProvider('sepolia');

const wallet = new Wallet(process.env.PRIVATE_KEY as string, lensProvider);

const request = {
  to: '0x00A58BA275E6BFC004E2bf9be121a15a2c543e71',
  value: 100000000000000n,
  from: '0x00A58BA275E6BFC004E2bf9be121a15a2c543e71',
  chainId: 37111,
  nonce: 31,
  maxPriorityFeePerGas: 0n,
  maxFeePerGas: 120000000n,
  // gas: 232534n,
  customData: {
    paymasterParams: utils.getPaymasterParams('0x65c3d8B46b7c27dB94b855Da097d0e5B2479784B', {
      type: 'General',
      innerInput: '0x',
    }),
  },
} as const;

const { hash } = await wallet.sendTransaction(request);

console.table({ hash });
