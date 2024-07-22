import { chains, getTxHistory } from '@lens-network/sdk/viem';
import { createPublicClient, zeroAddress, http } from 'viem';

const client = createPublicClient({
  chain: chains.testnet,
  transport: http(),
});

const { items } = await getTxHistory(client, {
  address: window.prompt('Enter an address', '') ?? zeroAddress,
  pageInfo: { page: 1, limit: 10, sort: 'asc' },
});

export default [`<h2>Tx History</h2>`, ...items.map((tx) => `<p>Hash: ${tx.hash}</p>`)];
