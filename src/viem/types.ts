import { Address, Hash, Hex } from 'viem';
import { ZkSyncRpcLog } from 'viem/zksync';

export type StorageEntry = {
  address: Address;
  key: Hex;
  writtenValue: Hex;
};

export type SendRawTransactionDetails = {
  transactionHash: Hash;
  storageLogs: StorageEntry[];
  events: ZkSyncRpcLog[];
};

export type PublicLensNetworkRpcSchema = [
  {
    Method: 'zks_sendRawTransactionWithDetailedOutput';
    Parameters: [Hex];
    ReturnType: SendRawTransactionDetails;
  },
];
