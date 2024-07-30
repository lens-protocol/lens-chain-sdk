import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { readContract } from 'viem/actions';
import { expect, describe, it } from 'vitest';

import {
  chains,
  getBlockNumberByTime,
  getContractABI,
  getContractCreation,
  getTokenBalance,
  getTokenInfo,
  getTokenTxHistory,
} from '.';
import { abi as lensErc20 } from './abi/lensErc20';
import { abi as lensErc721 } from './abi/lensErc721';
import { createERC20 } from './actions/createERC20';
import { createERC721 } from './actions/createERC721';
import { tag } from '../../test';

describe('Given the Viem actions', () => {
  describe(`When calling "${getBlockNumberByTime.name}"`, () => {
    const client = createPublicClient({
      chain: chains.testnet,
      transport: http(),
    });

    it('Then it should return the closest block number', async () => {
      const result = await getBlockNumberByTime(client, {
        closest: 'before',
        timestamp: Math.floor(Date.now() / 1000),
      });

      expect(result).toEqual(expect.hexString());
    });

    it('Then it should return null if not found', async () => {
      const result = await getBlockNumberByTime(client, {
        closest: 'after', // 'after now': impossible to find
        timestamp: Math.floor(Date.now() / 1000),
      });

      expect(result).toBeNull();
    });
  });

  describe(`When calling "${getContractCreation.name}"`, () => {
    const client = createPublicClient({
      chain: chains.testnet,
      transport: http(),
    });

    it('Then it should return the relevant contract creation information', async () => {
      const [details] = await getContractCreation(client, {
        addresses: ['0xe05715a3e605bbb7f058d83de829bb5063f3da1c'],
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
        chain: chains.testnet,
        transport: http(),
      });

      const result = await getTokenInfo(client, {
        address: '0xe05715a3e605bbb7f058d83de829bb5063f3da1c',
      });

      expect(result).toMatchObject({
        contractAddress: expect.evmAddress('0xe05715a3e605bbb7f058d83de829bb5063f3da1c'),
        iconURL: null,
        l1Address: null,
        liquidity: null,
        symbol: 'SDK',
        tokenDecimal: 18,
        tokenName: 'SDK Test Token',
        tokenPriceUSD: null,
      });
    });

    it('Then it should return null if token not found', async () => {
      const client = createPublicClient({
        chain: chains.testnet,
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
        chain: chains.testnet,
        transport: http(),
      });

      const { items } = await getTokenTxHistory(client, {
        address: '0x00A58BA275E6BFC004E2bf9be121a15a2c543e71',
        filterForContractAddress: '0xe0fF46E1B235AEefa1F242d6d91357f88CcAc78a',
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
        tokenID: expect.toBeOneOf([null, expect.hexString()]),
        tokenName: expect.toBeOneOf([null, expect.any(String)]),
        tokenSymbol: expect.toBeOneOf([null, expect.any(String)]),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tokenDecimal: expect.any(Number),
        transactionType: expect.hexString(),
      });
    });
  });

  describe(`When calling "${getContractABI.name}"`, () => {
    const client = createPublicClient({
      chain: chains.testnet,
      transport: http(),
    });

    it('Then it should return the contract ABI as JSON string', async () => {
      const abi = await getContractABI(client, {
        address: '0x44D3f533C370C9Ed8cfbe2d77b4440DC74959508',
      });

      expect(abi).toEqual(expect.stringMatching(/^\[{"inputs":/));
    });

    it('Then it should return null if not available', async () => {
      const abi = await getContractABI(client, {
        address: '0x0000000000000000000000000000000000000000',
      });

      expect(abi).toBeNull();
    });
  });

  describe(`When calling "${getTokenBalance.name}"`, () => {
    const client = createPublicClient({
      chain: chains.testnet,
      transport: http(),
    });

    it('Then it should return the balance as hex string', async () => {
      const balance = await getTokenBalance(client, {
        address: '0x00A58BA275E6BFC004E2bf9be121a15a2c543e71',
        contractAddress: '0x175a469603aA24EE4ef1F9B0B609e3F0988668B1',
      });

      expect(balance).toEqual(expect.hexString());
    });

    it('Then it should return "0x0" in any other scenario', async () => {
      const balance = await getTokenBalance(client, {
        address: '0x0000000000000000000000000000000000000000',
        contractAddress: '0x0000000000000000000000000000000000000000',
      });

      expect(balance).toEqual('0x0');
    });
  });

  tag('@write', () => {
    describe(`When calling "${createERC20.name}"`, () => {
      it('Then should return the ERC-20 contract address', {}, async () => {
        const account = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
        const client = createWalletClient({
          account,
          chain: chains.testnet,
          transport: http(),
        });

        const tokenAddress = await createERC20(client, {
          admins: [],
          decimals: 18,
          iconURI: 'https://example.com/icon.png',
          initialOwner: account.address,
          maxSupply: 100_000_000_000_000_000_000n,
          minters: [],
          mintRate: 0n,
          name: 'SDK Test Token',
          symbol: 'SDK',
        });

        const name = await readContract(client, {
          abi: lensErc20,
          address: tokenAddress,
          functionName: 'name',
        });
        expect(name).toBe('SDK Test Token');
      });
    });

    describe(`When calling "${createERC721.name}"`, () => {
      it('Then should return the ERC-721 contract address', {}, async () => {
        const account = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
        const client = createWalletClient({
          account,
          chain: chains.testnet,
          transport: http(),
        });

        const tokenAddress = await createERC721(client, {
          admins: [],
          iconURI: 'https://example.com/icon.png',
          initialOwner: account.address,
          maxSupply: 100_000_000_000_000_000_000n,
          minters: [],
          mintRate: 0n,
          name: 'My Collection',
          symbol: 'SDK',
        });

        const name = await readContract(client, {
          abi: lensErc721,
          address: tokenAddress,
          functionName: 'name',
        });
        expect(name).toBe('My Collection');
      });
    });
  });
});
