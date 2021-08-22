import { TransactionTag } from '../constants/transaction-fetcher';

export const processedResponse = [
  {
    txHash: 0xfb0973dfad0f82845d9aca31b0283cb288113ae8b6781e0445cc451d6449c030,
    labels: [TransactionTag.ERC20_TRANSFER],
    events: ['OrdersMatched'],
    time: '2020/01/01 10:10AM',
    txFee: 0.002,
    txFeeUSD: 5,
    sentTokenBalances: [
      {
        symbol: 'ETH',
        address: '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2',
        priceUSD: 10,
        balance: 2,
        balanceUSD: 20,
      },
    ],
    receivedTokenBalances: [
      {
        symbol: 'USDC',
        address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        priceUSD: 1,
        balance: 20,
        balanceUSD: 20,
      },
    ],
  },
];
