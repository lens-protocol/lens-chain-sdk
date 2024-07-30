import { Address, Hash, Hex } from 'viem';
import { ZkSyncRpcLog } from 'viem/zksync';

import {
  ContractCreationAddresses,
  SecondsSinceEpoch,
  TimeDirection,
  TokenTxHistoryRequest,
  TxHistoryRequest,
} from '../types';

export type { SecondsSinceEpoch, TimeDirection, PagingResult, PagingInformation } from '../types';

/**
 * A token minter address with a label.
 */
export type Minter = {
  addr: Address;
  label: string;
};

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

export type TokenInfoResult = {
  contractAddress: Address;
  tokenName: string;
  symbol: string;
  tokenDecimal: number;
  tokenPriceUSD: string | null;
  liquidity: string | null;
  l1Address: Address | null;
  iconURL: string | null;
};

export type TxHistoryItem = {
  /**
   * The transaction hash.
   */
  hash: Hash;
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
  blockHash: Hash;
  /**
   * Timestamp in seconds since the Unix epoch.
   */
  timeStamp: Hex;
  commitTxHash: Hash | null;
  proveTxHash: Hash | null;
  executeTxHash: Hash | null;
  isL1Originated: Hex;
  l1BatchNumber: Hex;
  contractAddress: Address | null;
  isError: Hex;
  txreceipt_status: Hex;
  methodId: Hex;
  functionName: string;
  type: Hex;
};

export type TokenTxHistoryItem = {
  hash: Hash;
  to: Address;
  from: Address;
  transactionIndex: Hex;
  input: Hex;
  value: Hex | null;
  gas: Hex;
  gasPrice: Hex;
  gasUsed: Hex;
  cumulativeGasUsed: Hex;
  fee: Hex;
  nonce: Hex;
  confirmations: Hex;
  blockNumber: Hex;
  blockHash: Hash;
  l1BatchNumber: Hex;
  timeStamp: Hex;
  contractAddress: Address;
  tokenId: string | null;
  tokenName: string | null;
  tokenSymbol: string | null;
  tokenDecimal: string | null;
  transactionType: Hex;
};

export type TokenBalanceRequest = {
  address: Address;
  contractAddress: Address;
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
    Parameters: [TxHistoryRequest<Address>];
    ReturnType: readonly TxHistoryItem[];
  },
  {
    Method: 'lens_getContractCreation';
    Parameters: ContractCreationAddresses<Address>;
    ReturnType: readonly ContractsCreationResult[] | null;
  },
  {
    Method: 'lens_getTokenInfo';
    Parameters: [string];
    ReturnType: TokenInfoResult | null;
  },
  {
    Method: 'lens_getTokenTxHistory';
    Parameters: [TokenTxHistoryRequest<Address>];
    ReturnType: readonly TokenTxHistoryItem[];
  },
  {
    Method: 'lens_getNftTxHistory';
    Parameters: [TokenTxHistoryRequest<Address>];
    ReturnType: readonly TokenTxHistoryItem[];
  },
  {
    Method: 'lens_getContractABI';
    Parameters: [string];
    ReturnType: string;
  },
  {
    Method: 'lens_getTokenBalance';
    Parameters: [TokenBalanceRequest];
    ReturnType: string;
  },
];
