import { createPublicClient, http } from 'viem';
import { expect, describe, it } from 'vitest';

import { chains, getBlockNumberByTime, getContractCreation } from '.';
import { getTokenInfo } from './actions/getTokenInfo';

describe('Given the Viem actions', () => {
  describe(`When calling "${getBlockNumberByTime.name}"`, () => {
    it('Then it should return the closest block number', async () => {
      const client = createPublicClient({
        chain: chains.staging,
        transport: http(),
      });

      const result = await getBlockNumberByTime(client, {
        closest: 'before',
        timestamp: Math.floor(Date.now() / 1000),
      });

      expect(result).toEqual(expect.hexString());
    });
  });

  describe(`When calling "${getContractCreation.name}"`, () => {
    const client = createPublicClient({
      chain: chains.staging,
      transport: http(),
    });

    it('Then it should return the relevant contract creation information', async () => {
      const [details] = await getContractCreation(client, {
        addresses: ['0x175a469603aa24ee4ef1f9b0b609e3f0988668b1'],
      });

      expect(details).toMatchObject({
        contractAddress: expect.evmAddress(),
        contractCreator: expect.evmAddress(),
        txHash: expect.hexString(),
      });
    });

    it('Then it should return an empty array if no contract creation information is found', async () => {
      const result = await getContractCreation(client, {
        addresses: ['0x0000000000000000000000000000000000000000'],
      });

      expect(result).toEqual([]);
    });
  });

  describe(`When calling "${getTokenInfo.name}"`, () => {
    it('Then it should return the given token info', async () => {
      const client = createPublicClient({
        chain: chains.localhost,
        transport: http(),
      });

      const result = await getTokenInfo(client, {
        address: '0x175a469603aa24ee4ef1f9b0b609e3f0988668b1',
      });

      expect(result).toMatchObject({
        contractAddress: expect.evmAddress('0x175a469603aa24ee4ef1f9b0b609e3f0988668b1'),
        iconURL: '',
        l1Address: '',
        liquidity: '',
        symbol: 'MTK',
        tokenDecimal: '18',
        tokenName: 'TestErc20Token',
        tokenPriceUSD: '',
      });
    });

    it('Then it should return null if token not found', async () => {
      const client = createPublicClient({
        chain: chains.localhost,
        transport: http(),
      });

      const result = await getTokenInfo(client, {
        address: '0x0000000000000000000000000000000000000000',
      });

      expect(result).toBeNull();
    });
  });
});
