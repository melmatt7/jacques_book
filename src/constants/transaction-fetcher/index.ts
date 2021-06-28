export type TransactionData = {
  hash: string;
  time: string;
  sentAmount: number;
  receivedAmount: number;
  receivedAmountUSD: number;
  txFeeUSD: number;
  events: string[];
};
