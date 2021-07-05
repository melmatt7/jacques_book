export type TransactionData = {
  txHash: string;
  time: string;
  sentAmount: number;
  sentAmountUSD: number;
  sentTokenSymbol: string;
  receivedAmount: number;
  receivedAmountUSD: number;
  receivedTokenSymbol: string;
  txFeeUSD: number;
  events?: string[];
  labels?: TransactionTag[];
};

export enum TransactionTag {
  ETH_TRANSFER = 'ETH Transfer',
  ERC20_TRANSFER = 'ERC20 Transfer',
  TX_CANCELLATION = 'Transaction Cancellation',
  STAKE = 'Stake',
  EXIT_STAKE = 'Exit Stake',
}
