import { chains } from '@lens-network/sdk/viem';
import { createPublicClient, http } from 'viem';

const publicClients = [
  createPublicClient({
    chain: chains.sepoliaDevelopment,
    transport: http(),
  }),
];

export default await Promise.all(
  publicClients.map(async (client) =>
    [
      `<h2>${client.chain?.name}</h2>`,
      `<p>Chain Id: ${await client.getChainId()}</p>`,
      `<p>Current Block Number: ${await client.getBlockNumber()}</p>`,
    ].join('\n'),
  ),
);
