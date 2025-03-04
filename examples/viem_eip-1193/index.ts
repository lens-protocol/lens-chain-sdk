import 'viem/window';

import { chains } from '@lens-chain/sdk/viem';
import { Address, createWalletClient, custom } from 'viem';

const chain = chains.testnet;

// hoist account
const [account] = (await window.ethereum!.request({ method: 'eth_requestAccounts' })) as [Address];

const client = createWalletClient({
  account,
  chain,
  transport: custom(window.ethereum!),
});

const chainId = await client.getChainId();

if (chainId !== chain.id) {
  try {
    await client.switchChain({ id: chain.id });
  } catch {
    await client.addChain({ chain });
  }
}

export default [
  `<h2>${client.chain.name}</h2>`,
  `<p>Chain Id: ${await client.getChainId()}</p>`,
  `<p>Account: ${account}</p>`,
];
