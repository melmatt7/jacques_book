export type TransactionData = {
  hash: string;
  time: string;
  sentAmount: number;
  sentAmountUSD: number;
  receivedAmount: number;
  receivedAmountUSD: number;
  txFeeUSD: number;
  events: string[];
};
