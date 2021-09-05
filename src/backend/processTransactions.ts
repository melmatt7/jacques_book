import { getTokenPrices } from '../api/Zapper/getTokenPrices';
import { getAddressTransactions } from '../api/Covalent/getAddressTransactions';
import moment from 'moment';
import { TransactionData, TransactionTag } from '../constants/transaction-fetcher';
import BigNumber from 'bignumber.js';
import { ItemsEntity, QueryResponse } from '../constants/api/covalent/ResponseTypes';
import { getExchangeRateAtSpecificTime } from '../api/getExchangeRateAtSpecificTime';

import { covalentData } from '../sample_data/covalentData';
import { getHistoricalTokenPrice } from '../api/Covalent/getHistoricalTokenPrice';

export type TransferInfo = {
  from: string;
  to: string;
  value: number;
};

type TokenBalance = {
  symbol: string;
  address: string;
  priceUSD: number;
  balance: number;
  balanceUSD: number;
};
export type ProcessedResponse = {
  txHash: string;
  labels: TransactionTag[];
  events: string[];
  time: string;
  txFee: number;
  txFeeUSD: number;
  sentTokenBalances: TokenBalance[];
  receivedTokenBalances: TokenBalance[];
};

export const buildResponse = (
  txData: ItemsEntity,
  labels: TransactionTag[] = [],
  events: string[] = [],
  sentTokenBalances: TokenBalance[] = [],
  receivedTokenBalances: TokenBalance[] = [],
): ProcessedResponse => {
  const time = moment.unix(Date.parse(txData.block_signed_at) / 1000).format('YYYY-MM-DD h:mm A');
  const txFee = txData.gas_price * txData.gas_spent;
  const txFeeUSD = Number(txData.gas_quote.toFixed(2));
  const result = {
    txHash: txData.tx_hash,
    labels,
    events,
    time,
    txFee,
    txFeeUSD,
    sentTokenBalances,
    receivedTokenBalances,
  };
  console.log(result);
  return result;
};

export const getProcessedTransactions = async (address: string): Promise<ProcessedResponse[]> => {
  // const txs = await getAddressTransactions(address);
  const txs: QueryResponse = covalentData;

  const processedTx = await Promise.all(
    txs.data.items.map(async tx => {
      const labels = [];
      const timestamp = Number(moment.unix(Date.parse(tx.block_signed_at) / 1000).format('X'));

      // a tx cancellation
      if (tx.from_address === tx.to_address) {
        labels.push(TransactionTag.TX_CANCELLATION);
        console.log('tx cancel');
        return buildResponse(tx, labels);
      }

      /**
      // simple ETH transfer
      if (tx.value_quote > 0 && tx.log_events.length === 0) {
        labels.push(TransactionTag.ETH_TRANSFER);
        const tokenBalance = {
          symbol: 'ETH',
          address: '0x0000000000000000000000000000000000000000',
          priceUSD: tx.gas_quote_rate,
          balance: new BigNumber(tx.value).div(1e18).toNumber(),
          balanceUSD: tx.value_quote,
        };
        if (tx.to_address === address) {
          // receive
          labels.push(TransactionTag.RECEIVE);
          return buildResponse(tx, labels, [], [], [tokenBalance]);
        } else if (tx.from_address === address) {
          // sent
          labels.push(TransactionTag.SENT);
          return buildResponse(tx, labels, [], [tokenBalance], []);
        } else {
          throw Error("ETH transfer, from and to are neither user's address");
        }
      }
       */

      let sentTokenBalances: TokenBalance[] = [];
      let receivedTokenBalances: TokenBalance[] = [];

      // add eth transfer into sentBalance
      if (tx.value_quote > 0) {
        const sentEth: TokenBalance = {
          symbol: 'ETH',
          address: '0x0000000000000000000000000000000000000000',
          priceUSD: tx.gas_quote_rate,
          balance: +tx.value / 1e18,
          balanceUSD: tx.value_quote,
        };
        sentTokenBalances.push(sentEth);
      }

      const events = [];
      // read the events
      for (let i = 0; i < tx.log_events.length; i++) {
        const event = tx.log_events[i];
        const eventName = tx.log_events[i].decoded.name;
        events.push(eventName);
        if (event.decoded == null) {
          continue;
        }

        const name = event.decoded.name ?? '';
        if (name === 'Transfer') {
          if (event.sender_contract_decimals === 0) {
            // non ERC20
            labels.push(TransactionTag.NOT_ERC20_TRANSFER);
          }

          // prepare transfer event data
          let transferInfo = {
            from: '',
            to: '',
            value: 0,
            tokenSymbol: event.sender_contract_ticker_symbol,
            tokenAddress: event.sender_address.toLowerCase(),
            tokenDecimals: event.sender_contract_decimals,
          };
          event.decoded.params.map(param => {
            if (typeof param.value == 'string') {
              if (param.name === 'from') {
                transferInfo.from = param.value.toLowerCase();
              }
              if (param.name === 'to') {
                transferInfo.to = param.value.toLowerCase();
              }
              if (param.name === 'value') {
                transferInfo.value = Number(param.value) ?? 0;
              }
            }
          });
          if (transferInfo.from.length === 0 || transferInfo.to.length === 0) {
            throw Error('Transfer event data population problem');
          }

          const balance = new BigNumber(transferInfo.value)
            .div(10 ** transferInfo.tokenDecimals)
            .toNumber();
          let priceUSD: number;

          // try {
          //   priceUSD = (
          //     await getExchangeRateAtSpecificTime(transferInfo.tokenSymbol, 'USD', timestamp)
          //   ).rate;
          // } catch (error) {
          //   throw Error(`Error fetching exchange rate for ${transferInfo.tokenSymbol}`);
          // }
          try {
            const response = await getHistoricalTokenPrice(transferInfo.tokenAddress);
            // console.log(response.data);
            priceUSD = Number(response.data[0].prices[0].price);
          } catch (error) {
            priceUSD = 0;
            console.log(`Error fetching exchange rate for ${transferInfo.tokenSymbol}`);
            // throw Error(`Error fetching exchange rate for ${transferInfo.tokenSymbol}`);
          }
          // console.log(priceUSD);

          const tokenBalance: TokenBalance = {
            symbol: transferInfo.tokenSymbol,
            address: transferInfo.tokenAddress,
            priceUSD,
            balance,
            balanceUSD: balance * priceUSD,
          };
          if (transferInfo.from === address) {
            sentTokenBalances.push(tokenBalance);
          } else if (transferInfo.to === address) {
            receivedTokenBalances.push(tokenBalance);
          }
        }
      }

      buildResponse(tx, labels, events, sentTokenBalances, receivedTokenBalances);
    }),
  );

  return processedTx;
};
