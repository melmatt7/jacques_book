import { getTokenPrices } from '../api/Zapper/getTokenPrices';
import { getAddressTransactions } from '../api/Covalent/getAddressTransactions';
import moment from 'moment';
import { TransactionData } from '../constants/transaction-fetcher';

export const getProcessedTransactions = async (
  address: string,
): Promise<TransactionData[]> => {
  const txs = await getAddressTransactions(address);
  const tokenData = await getTokenPrices();

  const processedTx = txs.map(tx => {
    const time = moment
      .unix(Date.parse(tx.block_signed_at) / 1000)
      .format('YYYY-MM-DD h:mm A');
    console.log(Date.parse(tx.block_signed_at));

    if (tx.value !== '0') {
      if (tx.to_address === address) {
        // receive
        return {
          hash: tx.tx_hash,
          timestamp: Date.parse(tx.block_signed_at),
          time,
          sentAmount: 0 / 1e18, // TODO: fix this shiet
          sentAmountUSD: 0,
          receivedAmount: Number(tx.value) / 1e18,
          receivedAmountUSD: tx.value_quote,
          txFeeUSD: Number(tx.gas_quote.toFixed(2)),
          events: [],
        };
      } else {
        // sent
        return {
          hash: tx.tx_hash,
          timestamp: Date.parse(tx.block_signed_at),
          time,
          sentAmount: Number(tx.value) / 1e18,
          sentAmountUSD: tx.value_quote,
          receivedAmount: 0 / 1e18,
          receivedAmountUSD: 0,
          txFeeUSD: Number(tx.gas_quote.toFixed(2)),
          events: [],
        };
      }
    }

    // TODO: further refine what is returned here
    const events = tx.log_events
      ? tx.log_events.map(logEvent => {
          return logEvent.decoded ? logEvent.decoded.name : '';
        })
      : [];

    // not needed
    // const gas_eth = Web3.utils.fromWei(String(tx.gas_price));
    // const txFeeUSD = tx.gas_spent * tx.gas_spent;
    // TODO: determine shape of data and calculate them
    return {
      hash: tx.tx_hash,
      timestamp: Date.parse(tx.block_signed_at),
      time,
      sentAmount: 0 / 1e18,
      sentAmountUSD: 0,
      receivedAmount: 0 / 1e18,
      receivedAmountUSD: 0,
      txFeeUSD: Number(tx.gas_quote.toFixed(2)),
      events: events,
    };
  });
  return processedTx;
};
