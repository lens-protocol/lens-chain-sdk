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
  items: readonly T[];
};

export type TxHistoryRequest = {
  address: string;

  endBlock?: number;

  startBlock?: number;

  pageInfo: PagingInformation;
};

export type ContractCreationAddresses =
  | [string]
  | [string, string]
  | [string, string, string]
  | [string, string, string, string]
  | [string, string, string, string, string];

export type TokenTxHistoryRequest = {
  address: string;

  filterForContractAddress?: string;

  endBlock?: number;

  startBlock?: number;

  pageInfo: PagingInformation;
};
