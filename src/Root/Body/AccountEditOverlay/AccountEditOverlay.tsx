import React, { useEffect, useState } from 'react';
import styles from './AccountEditOverlay.module.scss';
import { getAddressTransactions } from '../../../api/getAddressTransactions';
import { AddressForm } from './AddressForm/AddressForm';
import { useStateAndStorage } from '../../../hooks/useStateAndLocalStorage';
import { NonIdealState } from '@blueprintjs/core/lib/esm/components/non-ideal-state/nonIdealState';
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons';
import { useAsyncFn } from 'react-use';
import { FormData } from './AddressForm/AddressForm';
import { Transaction, Transactions } from '../Body';
import {getExchangeRate} from "../../../api/getExchangeRate";


export const AccountEditOverlay: React.FC<{
  setTransactions: (transactions: any) => void;
  // setTransactions: (transactions: any) => void;
  hideOverlay: () => void;
  transactions: Transactions;
  // transactions: Transactions;
}> = ({ setTransactions, hideOverlay, transactions }) => {
  const [address, setAddress] = useStateAndStorage('address', '');
  const [fetchError, setFetchError] = useState('');
  // console.log('address', address);

  const [state, fetch] = useAsyncFn(async (checkedAddress: string) => {
    const result = await getAddressTransactions(checkedAddress);
    const result1 = await getAddressTransactions(checkedAddress);
    console.log(result1);
    const exchangeRate = await getExchangeRate('ethereum', 'usd');
    console.log('******************  BEGIN  ********************');
    if ((exchangeRate as Error).message) console.log((exchangeRate as Error).message);
    if (exchangeRate as number) console.log(exchangeRate);
    console.log('******************  END  ********************');

    if (result.status >= 200 && result.status < 300) {
      setTransactions(result.data.data);
      // setTransactions(result1.data.data.items);
      hideOverlay();
      setAddress(result.data.data.address);
    } else {
      setFetchError(result);
    }
  }, []);

  useEffect(() => {
    if (address) {
      fetch(address);
    }
  }, [address, fetch]);

  const onSubmit = async (data: FormData) => {
    fetch(data.address);
  };

  const onCancel = () => {
    hideOverlay();
    setAddress(transactions.address);
  };

  return (
    <div className={styles.root}>
      {fetchError ? (
        <NonIdealState
          icon="error"
          title="Address fetching error"
          description={fetchError}
          action={
            <Button onClick={() => setFetchError('')}>Return to form</Button>
          }
        />
      ) : (
        <div className={styles.container}>
          <AddressForm
            address={address}
            onSubmit={onSubmit}
            onCancel={onCancel}
            isCancelable={Boolean('False')}
          />
        </div>
      )}
    </div>
  );
};
