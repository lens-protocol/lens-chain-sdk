import { chains } from '@lens-network/sdk/viem';
import { Hex, createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sendRawTransaction } from 'viem/actions';

const chain = chains.staging;

const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);

const client = createWalletClient({
  account,
  chain,
  transport: http(),
});

const request = await client.prepareTransactionRequest({
  to: account.address,
  value: parseEther('0.0001'),
});

const signedTransaction = await client.signTransaction(request);

const txHash = await sendRawTransaction(client, {
  serializedTransaction: signedTransaction,
});

console.table({ txHash });
