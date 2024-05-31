import { chains, getBlockNumberByTime } from '@lens-network/sdk/viem';
import { createPublicClient, http } from 'viem';

const client = createPublicClient({
  chain: chains.localhost,
  transport: http(),
});

export default [
  `<h2>${client.chain?.name}</h2>`,
  `<p>Last Block Number: ${String(
    await getBlockNumberByTime(client, {
      closest: 'before',
      timestamp: Math.floor(Date.now() / 1000),
    }),
  )}</p>`,
];
