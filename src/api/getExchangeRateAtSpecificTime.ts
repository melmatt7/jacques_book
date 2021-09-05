import axios from 'axios';
import { ApiResponse } from '../constants/api/common';

type CoinApiResponse = { rate: number };

const getExchangeRateAtSpecificTimeCoinApi = async (
  from: string,
  to: string,
  timestamp: number,
): Promise<CoinApiResponse> => {
  try {
    const response: ApiResponse = await axios.get(
      `https://rest.coinapi.io/v1/exchangerate/${from}/${to}?time=${timestamp}`,
      {
        params: {
          apikey: '6A953E7A-7D59-4818-8C81-DF435F67B181',
        },
      },
    );
    return response.data;
  } catch (e) {
    throw new Error('CoinApi: token(s) misspelled or not listed yet.');
  }
};

type NomicsHistoricalPriceResponse = { timestamp: string; rate: string };
export const getExchangeRateAtSpecificTime = async (
  from: string,
  timestamp: number,
): Promise<NomicsHistoricalPriceResponse[]> => {
  console.log(timestamp);
  const startTime = new Date(timestamp * 1000);
  const formattedStartTime = startTime.toISOString();
  const endTime = new Date((timestamp + 3599) * 1000);
  const formattedEndTime = endTime.toISOString();
  console.log(formattedStartTime, formattedEndTime);

  try {
    const response: ApiResponse = await axios.get(
      'https://api.nomics.com/v1/exchange-rates/history',
      {
        params: {
          key: 'f26e014d0a8f40e2e3d62888059a24e19bee4424',
          currency: from,
          start: formattedStartTime,
          end: formattedEndTime,
        },
      },
    );

    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error('CoinApi: token(s) misspelled or not listed yet.');
  }
};
