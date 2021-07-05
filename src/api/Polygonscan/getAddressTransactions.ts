import { Client } from './Client';

export const getAddressTransactions = async (address: string) => {
  const config = {
    params: {
      module: 'account',
      action: 'txlist',
      address: address,
      startblock: 1,
      endblock: 99999999,
      sort: 'asc',
      apikey: 'HF9FCJATEQ33Z1CAMTVUUUA3YP9YXHK7IJ',
    },
    header: {
      accept: 'application/json/text',
      'Access-Control-Allow-Headers': 'http://localhost:3000, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
    },
  };
  try {
    const result = await Client.get(`https://api.polygonscan.com/api`, config);
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
