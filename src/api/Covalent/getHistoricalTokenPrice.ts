import { client } from './Client';

export interface HistoricalPriceResponse {
  data?: DataEntity[] | null;
  error: boolean;
  error_message?: null;
  error_code?: null;
}
export interface DataEntity {
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  supports_erc?: string[] | null;
  logo_url: string;
  update_at: string;
  quote_currency: string;
  prices?: PricesEntity[] | null;
}
export interface PricesEntity {
  contract_metadata: ContractMetadata;
  date: string;
  price: number;
}
export interface ContractMetadata {
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  supports_erc?: string[] | null;
  logo_url: string;
}

export const getHistoricalTokenPrice = async (
  tokenAddress: string,
  chainId: number = 1,
  quoteCurrency = 'USD',
): Promise<HistoricalPriceResponse> => {
  try {
    const { data } = await client.get(
      `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/${chainId}/${quoteCurrency}/${tokenAddress}/`,
    );
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) {
      console.log('api response error', error.response);
      if (error.response.data) {
        return error.response.data.error_message;
      }
      return error.response;
    } else if (error.request) {
      console.log('api request error', error.request);
      return error.request;
    } else {
      console.log('unexpected api error', error.message);
      return error.message;
    }
  }
};
