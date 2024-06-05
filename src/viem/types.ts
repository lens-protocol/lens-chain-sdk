import { Address, Hash, Hex } from 'viem';
import { ZkSyncRpcLog } from 'viem/zksync';

import { SecondsSinceEpoch, TimeDirection, TxHistoryRequest } from '../types';

export type { SecondsSinceEpoch, TimeDirection, PagingResult, PagingInformation } from '../types';

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
  {
    Method: 'lens_getBlockNumberByTime';
    Parameters: [TimeDirection, SecondsSinceEpoch];
    ReturnType: string;
  },
  {
    Method: 'lens_getTxHistory';
    Parameters: [TxHistoryRequest];
    ReturnType: string;
  },
];
