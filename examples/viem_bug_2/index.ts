import { chains } from '@lens-network/sdk/viem';
import { parseAbi, Hex, createWalletClient, http, encodeFunctionData } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { getGasPrice } from 'viem/actions';
import { eip712WalletActions, getGeneralPaymasterInput, sendEip712Transaction } from 'viem/zksync';

const chain = chains.testnet;

const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);

const walletClient = createWalletClient({
  account,
  chain,
  transport: http(),
}).extend(eip712WalletActions());

const abi = parseAbi([
  "function ping()"
]);

const hash = await sendEip712Transaction(walletClient, {
  account,
  to: '0x06a71429d153026a0F3bAdf481c216FDfe2d0629',
  data: encodeFunctionData({
    abi: abi,
    functionName: 'ping'
  }),
  paymaster: '0xE6b37F099439ED1Eb38a97b909E9AD0ad74270Af',
  paymasterInput: getGeneralPaymasterInput({
    innerInput: '0x',
  }),
  gasPrice: await getGasPrice(walletClient)
})

console.log(hash)
