import React, { useEffect, useState } from 'react';
import styles from './AccountEditOverlay.module.scss';
import { getAddressTransactions } from '../../../api/Covalent/getAddressTransactions';
import { AddressForm } from './AddressForm/AddressForm';
import { useStateAndStorage } from '../../../hooks/useStateAndLocalStorage';
import { NonIdealState } from '@blueprintjs/core/lib/esm/components/non-ideal-state/nonIdealState';
import { Button } from '@blueprintjs/core/lib/esm/components/button/buttons';
import { useAsyncFn } from 'react-use';
import { FormData } from './AddressForm/AddressForm';

import { getProcessedTransactions } from '../../../backend/processData';
import { DataResponse } from '../../../constants/api/covalent/transactions';

export const AccountEditOverlay: React.FC<{
  setTransactions: (transactions: DataResponse) => void;
  hideOverlay: () => void;
  transactions: DataResponse;
}> = ({ setTransactions, hideOverlay, transactions }) => {
  const [address, setAddress] = useStateAndStorage('address', '');
  const [fetchError, setFetchError] = useState('');

  const [state, fetch] = useAsyncFn(async (checkedAddress: string) => {
    const result = await getAddressTransactions(checkedAddress);
    console.log(result);
    if (result.status >= 200 && result.status < 300) {
      setTransactions(result.data.data);
      hideOverlay();
      setAddress(result.data.data.address);
    } else {
      //@ts-ignore
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
