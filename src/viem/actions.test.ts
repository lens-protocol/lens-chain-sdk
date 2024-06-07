import { createPublicClient, http } from 'viem';
import { expect, describe, it } from 'vitest';

import { chains, getBlockNumberByTime, getContractCreation, getTokenTxHistory } from '.';
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

  describe(`When calling "${getTokenTxHistory.name}"`, () => {
    it('Then it should return a paginated list of token transfers', async () => {
      const client = createPublicClient({
        chain: chains.localhost,
        transport: http(),
      });

      const { items } = await getTokenTxHistory(client, {
        address: '0x00a58ba275e6bfc004e2bf9be121a15a2c543e71',
        pageInfo: { page: 1, limit: 10, sort: 'asc' },
      });

      expect(items[0]).toMatchObject({
        hash: expect.hexString(),
        to: expect.evmAddress(),
        from: expect.evmAddress(),
        transactionIndex: expect.hexString(),
        input: expect.hexString(),
        value: expect.hexString(),
        gas: expect.hexString(),
        gasPrice: expect.hexString(),
        gasUsed: expect.hexString(),
        cumulativeGasUsed: expect.hexString(),
        fee: expect.hexString(),
        nonce: expect.hexString(),
        confirmations: expect.hexString(),
        blockNumber: expect.hexString(),
        blockHash: expect.hexString(),
        l1BatchNumber: expect.hexString(),
        timeStamp: expect.hexString(),
        contractAddress: expect.evmAddress(),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tokenName: expect.any(String),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tokenSymbol: expect.any(String),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tokenDecimal: expect.any(String),
        transactionType: expect.hexString(),
      });
    });
  });
});
