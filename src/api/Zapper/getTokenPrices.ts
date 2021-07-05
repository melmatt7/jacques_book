import axios from 'axios';
import { ApiResponse } from '../../constants/api/common';

interface ZapperPriceResponse {
  address: string;
  decimals: number;
  symbol: string;
  price: number;
}

export const getTokenPrices = async (): Promise<ZapperPriceResponse[]> => {
  // TODO: use react query to cache
  try {
    const data: ApiResponse = await axios.get(`https://api.zapper.fi/v1/prices`, {
      params: {
        api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
      },
    });
    return data.data;
  } catch {
    throw new Error('Zapper tokenlist fetching error');
  }
};
