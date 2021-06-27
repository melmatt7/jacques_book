import { getAddressTransactions } from '../api/Covalent/getAddressTransactions';
import { CovalentApiResponse } from '../constants/api/covalent/transactions';

export const getProcessedTransactions = async (
  address: string,
): Promise<CovalentApiResponse> => {
  //@ts-ignore
  const result = await getAddressTransactions(address);
  //@ts-ignore
  return {};
};
