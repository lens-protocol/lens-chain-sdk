import { Address, Hash, Hex } from 'viem';
import { ZkSyncRpcLog } from 'viem/zksync';

import {
  ContractCreationAddresses,
  SecondsSinceEpoch,
  TimeDirection,
  TxHistoryRequest,
} from '../types';

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

export type ContractsCreationResult = {
  contractAddress: Address;
  contractCreator: Address;
  txHash: Hex;
};

export type TxHistoryItem = {
  /**
   * The transaction hash.
   */
  hash: Hex;
  to: Address;
  from: Address;
  transactionIndex: Hex;
  input: Hex;
  value: Hex;
  gas: Hex;
  gasPrice: Hex;
  gasUsed: Hex;
  cumulativeGasUsed: Hex;
  fee: Hex;
  nonce: Hex;
  confirmations: Hex;
  blockNumber: Hex;
  blockHash: Hex;
  /**
   * Timestamp in seconds since the Unix epoch.
   */
  timeStamp: Hex;
  commitTxHash: Hex | null;
  proveTxHash: Hex | null;
  executeTxHash: Hex | null;
  isL1Originated: Hex;
  l1BatchNumber: Hex;
  contractAddress: Address | null;
  isError: Hex;
  txreceipt_status: Hex;
  methodId: Hex;
  functionName: string;
  type: Hex;
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
    ReturnType: Hex;
  },
  {
    Method: 'lens_getTxHistory';
    Parameters: [TxHistoryRequest];
    ReturnType: readonly TxHistoryItem[];
  },
  {
    Method: 'lens_getContractCreation';
    Parameters: ContractCreationAddresses;
    ReturnType: readonly ContractsCreationResult[] | null;
  },
];
