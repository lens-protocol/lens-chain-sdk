import { mainnet, testnet } from '../chains';

/**
 * Network types.
 */
export enum Network {
  Mainnet = mainnet.id,
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
