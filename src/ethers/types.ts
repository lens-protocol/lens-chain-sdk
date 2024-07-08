import { DeployedContracts, testnet } from '../chains';
import { PagingResult } from '../types';

export type { SecondsSinceEpoch, TimeDirection } from '../types';
export type { DeployedContracts, PagingResult };

/**
 * Network types.
 */
export enum Network {
  Mainnet = NaN,
  Testnet = testnet.id,
}

export type StorageEntry = {
  address: string;
  key: string;
  writtenValue: string;
};

export type OptimisticLog = {
  /**
   *  The transaction hash for the transaction the log occurred in.
   */
  transactionHash: string;
  /**
   *  The address of the contract that emitted this log.
   */
  address: string;
  /**
   *  The data emitted with this log.
   */
  data: string;
  /**
   *  The topics emitted with this log.
   */
  topics: ReadonlyArray<string>;
  /**
   * The batch number on L1.
   * */
  readonly l1BatchNumber: null | number;
  /**
   * No block hash for optimistic logs.
   */
  readonly blockHash: null;
  /**
   * No block number for optimistic logs.
   */
  readonly blockNumber: null;
  /**
   * No log index for optimistic logs.
   */
  readonly logIndex: null;
  /**
   * No transaction index for optimistic logs.
   */
  readonly transactionIndex: null;
  /**
   * Never removed.
   */
  readonly removed: false;
};

export type SendRawTransactionDetails = {
  transactionHash: string;
  storageLogs: StorageEntry[];
  events: OptimisticLog[];
};

export type TxHistoryItem = {
  /**
   * The transaction hash.
   */
  hash: string;
  to: string;
  from: string;
  transactionIndex: string;
  input: string;
  value: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  fee: string;
  nonce: string;
  confirmations: string;
  blockNumber: string;
  blockHash: string;
  /**
   * Timestamp in seconds since the Unix epoch.
   */
  timeStamp: string;
  commitTxHash: string | null;
  proveTxHash: string | null;
  executeTxHash: string | null;
  isL1Originated: string;
  l1BatchNumber: string;
  contractAddress: string | null;
  isError: string;
  txreceipt_status: string;
  methodId: string;
  functionName: string;
  type: string;
};

export type TxHistoryResponse = PagingResult<TxHistoryItem>;

export type ContractsCreationResult = {
  contractAddress: string;
  contractCreator: string;
  txHash: string;
};

export type ContractCreationResponse = ReadonlyArray<ContractsCreationResult>;

export type TokenInfoResult = {
  contractAddress: string;
  tokenName: string;
  symbol: string;
  tokenDecimal: number;
  tokenPriceUSD: string | null;
  liquidity: string | null;
  l1Address: string | null;
  iconURL: string | null;
};

export type TokenTxHistoryItem = {
  hash: string;
  to: string;
  from: string;
  transactionIndex: string;
  input: string;
  value: string | null;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  fee: string;
  nonce: string;
  confirmations: string;
  blockNumber: string;
  blockHash: string;
  l1BatchNumber: string;
  timeStamp: string;
  contractAddress: string;
  tokenID: string | null;
  tokenName: string | null;
  tokenSymbol: string | null;
  tokenDecimal: string | null;
  transactionType: string;
};

export type TokenTxHistoryResponse = PagingResult<TokenTxHistoryItem>;
