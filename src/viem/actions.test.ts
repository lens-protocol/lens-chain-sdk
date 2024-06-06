import { createPublicClient, http } from 'viem';
import { expect, describe, it } from 'vitest';

import { chains, getBlockNumberByTime, getContractCreation } from '.';

describe('Given the Viem actions', () => {
  describe(`When calling "${getBlockNumberByTime.name}"`, () => {
    it('Then it should return the closest block number', async () => {
      const client = createPublicClient({
        chain: chains.localhost,
        transport: http(),
      });

      const result = await getBlockNumberByTime(client, {
        closest: 'before',
        timestamp: Math.floor(Date.now() / 1000),
      });

      expect(result).toMatchObject(expect.stringMatching(/^0x[0-9a-f]+$/i));
    });
  });

  describe(`When calling "${getContractCreation.name}"`, () => {
    it('Then it should return the relevant contract creation information', async () => {
      const client = createPublicClient({
        chain: chains.localhost,
        transport: http(),
      });

      const [details] = await getContractCreation(client, [
        '0x175a469603aa24ee4ef1f9b0b609e3f0988668b1',
      ]);

      expect(details).toMatchObject({
        contractAddress: '0x175a469603aa24ee4ef1f9b0b609e3f0988668b1',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        contractCreator: expect.stringMatching(/^0x[0-9a-f]{40}$/i),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        txHash: expect.stringMatching(/^0x[0-9a-f]{64}$/),
      });
    });

    it('The it should return an empty array if no contract creation information is found', async () => {
      const client = createPublicClient({
        chain: chains.localhost,
        transport: http(),
      });

      const result = await getContractCreation(client, [
        '0x0000000000000000000000000000000000000000',
      ]);

      expect(result).toEqual([]);
    });
  });
});
