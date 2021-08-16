import axios from 'axios';
import { ApiResponse } from '../constants/api/common';

type CoinApiResponse = { rate: number };

export const getExchangeRateAtSpecificTime = async (
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
