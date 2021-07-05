import { client } from './Client';

export const getAddressBalance = async (address: string) => {
  try {
    const result = await client.get(`https://api.covalenthq.com/v1/1/address/${address}/balances_v2/?nft=false`);
    return result;
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
