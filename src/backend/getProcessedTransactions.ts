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
      time,
      sentAmount: 0,
      receivedAmount: 0,
      receivedAmountUSD: 0,
      txFeeUSD: tx.gas_quote,
      events: events,
    };
  });
  return processedTx;
};
