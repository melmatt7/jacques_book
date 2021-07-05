import { getTokenPrices } from '../api/Zapper/getTokenPrices';
import { getAddressTransactions } from '../api/Covalent/getAddressTransactions';
import moment from 'moment';
import { TransactionData, TransactionTag } from '../constants/transaction-fetcher';

export type TransferInfo = {
  from: string;
  to: string;
  value: number;
};

export const buildResponse = (
  hash: string,
  labels: TransactionTag[],
  blockSignedAt: string,
  txFee: number,
  sentAmount: number = 0,
  sentAmountUSD: number = 0,
  sentTokenSymbol: string = '',
  receivedAmount: number = 0,
  receivedAmountUSD: number = 0,
  receivedTokenSymbol: string = '',
  events: string[] = [],
) => {
  const time = moment.unix(Date.parse(blockSignedAt) / 1000).format('YYYY-MM-DD h:mm A');
  return {
    txHash: hash,
    labels,
    time: time,
    txFeeUSD: Number(txFee.toFixed(2)),
    sentAmount,
    sentAmountUSD,
    sentTokenSymbol,
    receivedAmount,
    receivedAmountUSD,
    receivedTokenSymbol,
    events,
  };
};

export const getProcessedTransactions = async (address: string): Promise<TransactionData[]> => {
  const txs = await getAddressTransactions(address);
  const tokenData = await getTokenPrices();
  const Web3 = require('web3');

  const processedTx = txs.map(tx => {
    const time = moment.unix(Date.parse(tx.block_signed_at) / 1000).format('YYYY-MM-DD h:mm A');
    // console.log(Date.parse(tx.block_signed_at));

    // TODO: further refine what is returned here

    const labels = [];
    // most likely a ETH transfer
    if (tx.log_events.length === 0) {
      labels.push(TransactionTag.ETH_TRANSFER);
      if (tx.from_address === tx.to_address) {
        // a tx cancellation
        labels.push(TransactionTag.TX_CANCELLATION);
        return buildResponse(tx.tx_hash, labels, tx.block_signed_at, tx.gas_quote);
      } else {
        if (tx.to_address === address) {
          // receive
          return {
            txHash: tx.tx_hash,
            time,
            sentTokenSymbol: '',
            sentAmount: 0 / 1e18, // TODO: fix this shiet
            sentAmountUSD: 0,
            receivedTokenSymbol: 'ETH',
            receivedAmount: Number(tx.value) / 1e18,
            receivedAmountUSD: tx.value_quote,
            txFeeUSD: Number(tx.gas_quote.toFixed(2)),
            events: [],
          };
        } else {
          // sent
          return {
            txHash: tx.tx_hash,
            time,
            sentTokenSymbol: 'ETH',
            sentAmount: Number(tx.value) / 1e18,
            sentAmountUSD: tx.value_quote,
            receivedTokenSymbol: '',
            receivedAmount: 0 / 1e18,
            receivedAmountUSD: 0,
            txFeeUSD: Number(tx.gas_quote.toFixed(2)),
            events: [],
          };
        }
      }
    }

    // in cases where it is still a ETH transfer with events, but the events are not parsed
    if (tx.value_quote > 0 && tx.log_events.length > 0) {
      if (tx.to_address === address) {
        // receive
        return {
          txHash: tx.tx_hash,
          time,
          sentTokenSymbol: '',
          sentAmount: 0,
          sentAmountUSD: 0,
          receivedTokenSymbol: 'ETH',
          receivedAmount: Number(tx.value) / 1e18,
          receivedAmountUSD: tx.value_quote,
          txFeeUSD: Number(tx.gas_quote.toFixed(2)),
          events: [],
        };
      } else {
        // sent
        return {
          txHash: tx.tx_hash,
          time,
          sentTokenSymbol: 'ETH',
          sentAmount: Number(tx.value) / 1e18,
          sentAmountUSD: tx.value_quote,
          receivedTokenSymbol: '',
          receivedAmount: 0,
          receivedAmountUSD: 0,
          txFeeUSD: Number(tx.gas_quote.toFixed(2)),
          events: [],
        };
      }
    }

    // put all the events into a list
    const events = tx.log_events.map(logEvent => {
      if (logEvent.decoded == null) {
        return '';
      }
      const name = logEvent.decoded.name ?? '';
      return name;
    });

    let sentAmount = 0;
    let sentAmountUSD = 0;
    let sentTokenSymbol = '';
    let receivedAmount = 0;
    let receivedAmountUSD = 0;
    let receivedTokenSymbol = '';

    const eventsList = tx.log_events.map(logEvent => {
      // check if it's decoded
      if (logEvent.decoded == null) {
        return '';
      }

      const name = logEvent.decoded.name ?? '';

      // if it's a transfer

      if (name === 'Transfer') {
        let transferInfo = {
          from: '',
          to: '',
          value: 0,
          tokenSymbol: logEvent.sender_contract_ticker_symbol,
          tokenAddress: logEvent.sender_address.toLowerCase(),
          tokenDecimals: logEvent.sender_contract_decimals,
        };
        logEvent.decoded.params.map(param => {
          if (param.name === 'from') {
            transferInfo.from = param.value.toLowerCase();
          }
          if (param.name === 'to') {
            transferInfo.to = param.value.toLowerCase();
          }
          if (param.name === 'value') {
            transferInfo.value = Number(param.value);
          }
        });

        if (transferInfo.from.length === 0 || transferInfo.to.length === 0) {
          throw Error('Transfer event data population problem');
        }
        const tokenPrice = tokenData.find(t => t.address === transferInfo.tokenAddress)?.price ?? 0;
        if (transferInfo.from === address) {
          sentAmount = transferInfo.value / 10 ** transferInfo.tokenDecimals;
          sentAmountUSD = sentAmount * tokenPrice;
          sentTokenSymbol = transferInfo.tokenSymbol;
        } else if (transferInfo.to === address) {
          receivedAmount = transferInfo.value / 10 ** transferInfo.tokenDecimals;
          receivedAmountUSD = receivedAmount * tokenPrice;
          receivedTokenSymbol = transferInfo.tokenSymbol;
        }

        if (logEvent.sender_contract_decimals === 0) {
          // non ERC20 transfer
          [sentAmount, sentAmountUSD, receivedAmount, receivedAmountUSD] = [0, 0, 0, 0];
        }
      }
    });

    // TODO: determine shape of data and calculate them
    return {
      txHash: tx.tx_hash,
      labels,
      time,
      sentAmount,
      sentAmountUSD,
      sentTokenSymbol,
      receivedAmount,
      receivedAmountUSD,
      receivedTokenSymbol,
      txFeeUSD: Number(tx.gas_quote.toFixed(2)),
      events: events,
    };
  });
  return processedTx;
};
