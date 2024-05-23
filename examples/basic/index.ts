import "viem/window";

import { createWalletClient, custom } from "viem";
import { zkSync } from "viem/chains";
import { eip712WalletActions, publicActionsL2 } from "viem/zksync";

import { foo } from "@lens-network/sdk/viem";

console.log(foo);

const walletClient = createWalletClient({
  chain: zkSync,
  transport: custom(window.ethereum!),
})
  .extend(eip712WalletActions())
  .extend(publicActionsL2());

export default [];
