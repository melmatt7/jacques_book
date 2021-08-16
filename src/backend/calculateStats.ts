const sampleTxs = [
  {
    sentTokenBalances: [
      {
        standard: 'ETH',
        symbol: 'ETH',
        address: '0x0000000000000000000000000000000000000000',
        priceUSD: 3000,
        balance: 1,
        balanceUSD: 3000,
      },
    ],
    receivedTokenBalances: [
      {
        standard: 'ERC-721',
        symbol: 'ZUNK',
        address: '0x031920cc2d9f5c10b444fd44009cd64f829e7be2',
        priceUSD: 200,
        balance: 15,
        balanceUSD: 3000,
      },
    ],
    fee: '0.01',
    feeUSD: 30,
  },
];

interface TokenHolding {
  address: string;
  symbol: string;
  balance: number;
  balanceUSD: number;
}

export const calculateStats = async (address: string) => {
  // states
  // - currentValue
  // - totalContribution
  // - pnl
  let totalContribution = 0;
  let currentHoldings: Record<string, TokenHolding>;
  let currentValue = 0;
  let pnl = 0;

  sampleTxs.map(tx => {
    totalContribution = totalContribution + tx.feeUSD;
    tx.sentTokenBalances.map(sentTokenBalance => {
      const sentTokenLastBalance = currentHoldings[sentTokenBalance.address];
      // if a sent balance isn't previously in token holdings, then it's a contribution
      if (sentTokenLastBalance == null) {
        totalContribution = totalContribution + sentTokenBalance.balanceUSD;
        currentHoldings[sentTokenBalance.address] = {
          address: sentTokenBalance.address,
          symbol: sentTokenBalance.symbol,
          balance: sentTokenBalance.balance,
          balanceUSD: sentTokenBalance.balanceUSD,
        };
      } else {
        currentHoldings[sentTokenBalance.address] = {
          address: sentTokenBalance.address,
          symbol: sentTokenBalance.symbol,
          balance: sentTokenLastBalance.balance - sentTokenBalance.balance,
          balanceUSD: sentTokenLastBalance.balanceUSD - sentTokenBalance.balanceUSD,
        };
      }
    });

    tx.receivedTokenBalances.map(receivedTokenBalance => {
      const receivedTokenLastBalance = currentHoldings[receivedTokenBalance.address];
      if (receivedTokenLastBalance == null) {
        currentHoldings[receivedTokenBalance.address] = {
          address: receivedTokenBalance.address,
          symbol: receivedTokenBalance.symbol,
          balance: receivedTokenBalance.balance,
          balanceUSD: receivedTokenBalance.balanceUSD,
        };
      } else {
        currentHoldings[receivedTokenBalance.address] = {
          address: receivedTokenBalance.address,
          symbol: receivedTokenBalance.symbol,
          balance: receivedTokenLastBalance.balance + receivedTokenBalance.balance,
          balanceUSD: receivedTokenLastBalance.balanceUSD + receivedTokenBalance.balanceUSD,
        };
      }
    });
  });
  for (const [key, value] of Object.entries(currentHoldings)) {
    currentValue = currentValue + value.balanceUSD;
  }
  pnl = currentValue - totalContribution;
  return { currentHoldings, currentValue, pnl };
};
