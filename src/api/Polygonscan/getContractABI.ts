import { Client } from './Client';

export const getContractABI = async (address: string) => {
  const config = {
    params: {
      module: 'contract',
      action: 'getabi',
      address: address,
      apikey: 'HF9FCJATEQ33Z1CAMTVUUUA3YP9YXHK7IJ',
    },
    header: {
      accept: 'application/json',
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
