/**
 * EIP-3085: Add Ethereum Chain support.
 *
 * @see https://eips.ethereum.org/EIPS/eip-3085
 */
export type AddEthereumChainParameter = {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
};

/**
 * Timestamp in seconds since the Unix epoch.
 */
export type SecondsSinceEpoch = number;

/**
 * Describes a direction of search in time.
 */
export type TimeDirection = 'before' | 'after';

export type PagingInformation = {
  page: number;
  limit: number;
  sort: 'asc' | 'desc';
};

export type PagingResult<T> = {
  items: T[];
};

export type TxHistoryRequest = {
  address: string;

  endBlock?: number;

  startBlock?: number;

  pageInfo: PagingInformation;
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
  commitTxHash?: string;
  proveTxHash?: string;
  executeTxHash?: string;
  isL1Originated: string;
  l1BatchNumber: string;
  contractAddress?: string;
  isError: string;
  txreceipt_status: string;
  methodId: string;
  functionName: string;
  type: string;
};

export type TxHistoryResponse = PagingResult<TxHistoryItem>;
