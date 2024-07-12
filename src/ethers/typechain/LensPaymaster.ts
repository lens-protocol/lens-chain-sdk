/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export type TransactionStruct = {
  txType: BigNumberish;
  from: BigNumberish;
  to: BigNumberish;
  gasLimit: BigNumberish;
  gasPerPubdataByteLimit: BigNumberish;
  maxFeePerGas: BigNumberish;
  maxPriorityFeePerGas: BigNumberish;
  paymaster: BigNumberish;
  nonce: BigNumberish;
  value: BigNumberish;
  reserved: [BigNumberish, BigNumberish, BigNumberish, BigNumberish];
  data: BytesLike;
  signature: BytesLike;
  factoryDeps: BytesLike[];
  paymasterInput: BytesLike;
  reservedDynamic: BytesLike;
};

export type TransactionStructOutput = [
  txType: bigint,
  from: bigint,
  to: bigint,
  gasLimit: bigint,
  gasPerPubdataByteLimit: bigint,
  maxFeePerGas: bigint,
  maxPriorityFeePerGas: bigint,
  paymaster: bigint,
  nonce: bigint,
  value: bigint,
  reserved: [bigint, bigint, bigint, bigint],
  data: string,
  signature: string,
  factoryDeps: string[],
  paymasterInput: string,
  reservedDynamic: string
] & {
  txType: bigint;
  from: bigint;
  to: bigint;
  gasLimit: bigint;
  gasPerPubdataByteLimit: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  paymaster: bigint;
  nonce: bigint;
  value: bigint;
  reserved: [bigint, bigint, bigint, bigint];
  data: string;
  signature: string;
  factoryDeps: string[];
  paymasterInput: string;
  reservedDynamic: string;
};

export interface LensPaymasterInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "allowedToken"
      | "getTransactionCount"
      | "isAdmin"
      | "isAllowlisted"
      | "isBlocklisted"
      | "isTargetContractAllowlisted"
      | "isValidationBypassed"
      | "owner"
      | "pause"
      | "paused"
      | "postTransaction"
      | "priceForPayingFees"
      | "rateLimits"
      | "renounceOwnership"
      | "setAdmin"
      | "setAllowlist"
      | "setBlocklist"
      | "setRateLimits"
      | "setTargetContractAllowlist"
      | "setTokenAndPrice"
      | "setValidationBypass"
      | "transferOwnership"
      | "unpause"
      | "validateAndPayForPaymasterTransaction"
      | "withdraw"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "OwnershipTransferred" | "Paused" | "Unpaused"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "allowedToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTransactionCount",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isAdmin",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isAllowlisted",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isBlocklisted",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isTargetContractAllowlisted",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidationBypassed",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "postTransaction",
    values: [
      BytesLike,
      TransactionStruct,
      BytesLike,
      BytesLike,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "priceForPayingFees",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rateLimits",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setAdmin",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setAllowlist",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setBlocklist",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setRateLimits",
    values: [BigNumberish, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setTargetContractAllowlist",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "setTokenAndPrice",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setValidationBypass",
    values: [AddressLike, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "validateAndPayForPaymasterTransaction",
    values: [BytesLike, BytesLike, TransactionStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "allowedToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTransactionCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isAllowlisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isBlocklisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isTargetContractAllowlisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidationBypassed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "postTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "priceForPayingFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "rateLimits", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAllowlist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setBlocklist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRateLimits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTargetContractAllowlist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setTokenAndPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setValidationBypass",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "validateAndPayForPaymasterTransaction",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface LensPaymaster extends BaseContract {
  connect(runner?: ContractRunner | null): LensPaymaster;
  waitForDeployment(): Promise<this>;

  interface: LensPaymasterInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  allowedToken: TypedContractMethod<[], [string], "view">;

  getTransactionCount: TypedContractMethod<
    [_user: AddressLike],
    [[bigint, bigint]],
    "view"
  >;

  isAdmin: TypedContractMethod<[_user: AddressLike], [boolean], "view">;

  isAllowlisted: TypedContractMethod<[_user: AddressLike], [boolean], "view">;

  isBlocklisted: TypedContractMethod<[_user: AddressLike], [boolean], "view">;

  isTargetContractAllowlisted: TypedContractMethod<
    [_contractAddress: AddressLike],
    [boolean],
    "view"
  >;

  isValidationBypassed: TypedContractMethod<
    [_user: AddressLike],
    [boolean],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  pause: TypedContractMethod<[], [void], "nonpayable">;

  paused: TypedContractMethod<[], [boolean], "view">;

  postTransaction: TypedContractMethod<
    [
      _context: BytesLike,
      _transaction: TransactionStruct,
      arg2: BytesLike,
      arg3: BytesLike,
      _txResult: BigNumberish,
      _maxRefundedGas: BigNumberish
    ],
    [void],
    "payable"
  >;

  priceForPayingFees: TypedContractMethod<[], [bigint], "view">;

  rateLimits: TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint] & {
        globalLimit: bigint;
        userLimit: bigint;
        rateLimitWindowDuration: bigint;
        rateLimitWindowStart: bigint;
      }
    ],
    "view"
  >;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  setAdmin: TypedContractMethod<
    [_user: AddressLike, _admin: boolean],
    [void],
    "nonpayable"
  >;

  setAllowlist: TypedContractMethod<
    [_user: AddressLike, _allowed: boolean],
    [void],
    "nonpayable"
  >;

  setBlocklist: TypedContractMethod<
    [_user: AddressLike, _blocked: boolean],
    [void],
    "nonpayable"
  >;

  setRateLimits: TypedContractMethod<
    [
      _globalLimit: BigNumberish,
      _userLimit: BigNumberish,
      _duration: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  setTargetContractAllowlist: TypedContractMethod<
    [contractAddress: AddressLike, allowed: boolean],
    [void],
    "nonpayable"
  >;

  setTokenAndPrice: TypedContractMethod<
    [_erc20: AddressLike, _priceForPayingFees: BigNumberish],
    [void],
    "nonpayable"
  >;

  setValidationBypass: TypedContractMethod<
    [_user: AddressLike, _bypassValidations: boolean],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  unpause: TypedContractMethod<[], [void], "nonpayable">;

  validateAndPayForPaymasterTransaction: TypedContractMethod<
    [arg0: BytesLike, arg1: BytesLike, _transaction: TransactionStruct],
    [[string, string] & { magic: string; context: string }],
    "payable"
  >;

  withdraw: TypedContractMethod<[_to: AddressLike], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "allowedToken"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getTransactionCount"
  ): TypedContractMethod<[_user: AddressLike], [[bigint, bigint]], "view">;
  getFunction(
    nameOrSignature: "isAdmin"
  ): TypedContractMethod<[_user: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "isAllowlisted"
  ): TypedContractMethod<[_user: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "isBlocklisted"
  ): TypedContractMethod<[_user: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "isTargetContractAllowlisted"
  ): TypedContractMethod<[_contractAddress: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "isValidationBypassed"
  ): TypedContractMethod<[_user: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "paused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "postTransaction"
  ): TypedContractMethod<
    [
      _context: BytesLike,
      _transaction: TransactionStruct,
      arg2: BytesLike,
      arg3: BytesLike,
      _txResult: BigNumberish,
      _maxRefundedGas: BigNumberish
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "priceForPayingFees"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "rateLimits"
  ): TypedContractMethod<
    [],
    [
      [bigint, bigint, bigint, bigint] & {
        globalLimit: bigint;
        userLimit: bigint;
        rateLimitWindowDuration: bigint;
        rateLimitWindowStart: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setAdmin"
  ): TypedContractMethod<
    [_user: AddressLike, _admin: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setAllowlist"
  ): TypedContractMethod<
    [_user: AddressLike, _allowed: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setBlocklist"
  ): TypedContractMethod<
    [_user: AddressLike, _blocked: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setRateLimits"
  ): TypedContractMethod<
    [
      _globalLimit: BigNumberish,
      _userLimit: BigNumberish,
      _duration: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setTargetContractAllowlist"
  ): TypedContractMethod<
    [contractAddress: AddressLike, allowed: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setTokenAndPrice"
  ): TypedContractMethod<
    [_erc20: AddressLike, _priceForPayingFees: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "setValidationBypass"
  ): TypedContractMethod<
    [_user: AddressLike, _bypassValidations: boolean],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "unpause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "validateAndPayForPaymasterTransaction"
  ): TypedContractMethod<
    [arg0: BytesLike, arg1: BytesLike, _transaction: TransactionStruct],
    [[string, string] & { magic: string; context: string }],
    "payable"
  >;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[_to: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Paused"
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: "Unpaused"
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;

  filters: {
    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Paused(address)": TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;
    Paused: TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;

    "Unpaused(address)": TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
    Unpaused: TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
  };
}
