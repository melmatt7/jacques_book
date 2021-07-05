import { CovalentApiResponse, ItemResponse } from '../../constants/api/covalent/ResponseTypes';
import { client } from './Client';

export const getAddressTransactions = async (address: string): Promise<ItemResponse[]> => {
  try {
    const result: CovalentApiResponse = await client.get(
      `https://api.covalenthq.com/v1/1/address/${address}/transactions_v2/`,
    );
    return result.data.data.items;
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
