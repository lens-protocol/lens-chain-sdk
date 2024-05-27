import './globals';
import { BrowserProvider, chains } from '@lens-network/sdk/ethers';
import { Eip1193Provider } from 'ethers';

const provider = new BrowserProvider(window.ethereum as Eip1193Provider);

await provider.send('wallet_addEthereumChain', [chains.staging]);

await provider.send('wallet_switchEthereumChain', [{ chainId: chains.staging.chainId }]);

const network = await provider.getNetwork();

export default [
  `<h2>${network.name}</h2>`,
  `<p>Chain Id: ${network.chainId}</p>`,
  `<p>Current Block Number: ${await provider.getBlockNumber()}</p>`,
];
