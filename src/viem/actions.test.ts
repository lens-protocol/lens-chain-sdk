import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { readContract } from 'viem/actions';
import { expect, describe, it } from 'vitest';

import {
  chains
} from '.';
import { abi as basicErc20Abi } from './abi/basicErc20';
import { abi as basicErc721 } from './abi/basicErc721';
import { createErc20 } from './actions/createErc20';
import { createErc721 } from './actions/createErc721';
import { tag } from '../../test';

describe.skip('Given the Viem actions', () => {
  tag('@write', () => {
    describe(`When calling "${createErc20.name}"`, () => {
      it('Then should return the ERC-20 contract address', {}, async () => {
        const account = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
        const client = createWalletClient({
          account,
          chain: chains.testnet,
          transport: http(),
        });

        const tokenAddress = await createErc20(client, {
          initialOwner: account.address,
          initialSupply: 100_000_000_000_000_000_000n,
          name: 'SDK Test Token',
          symbol: 'SDK',
        });

        const name = await readContract(client, {
          abi: basicErc20Abi,
          address: tokenAddress,
          functionName: 'name',
        });
        expect(name).toBe('SDK Test Token');
      });
    });

    describe(`When calling "${createErc721.name}"`, () => {
      it('Then should return the ERC-721 contract address', {}, async () => {
        const account = privateKeyToAccount(import.meta.env.PRIVATE_KEY);
        const client = createWalletClient({
          account,
          chain: chains.testnet,
          transport: http(),
        });

        const tokenAddress = await createErc721(client, {
          initialOwner: account.address,
          maxSupply: 100n,
          name: 'My Collection',
          symbol: 'SDK',
        });

        const name = await readContract(client, {
          abi: basicErc721,
          address: tokenAddress,
          functionName: 'name',
        });
        expect(name).toBe('My Collection');
      });
    });
  });
});
