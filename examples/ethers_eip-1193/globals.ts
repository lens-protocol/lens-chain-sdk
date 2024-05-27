import { Eip1193Provider } from 'ethers';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    ethereum?: Eip1193Provider | undefined;
  }
}
