import React, { useState } from 'react';
import styles from './Body.module.scss';
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  Icon,
  InputGroup,
  Intent,
} from '@blueprintjs/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAsyncFn } from 'react-use';
import { getProcessedTransactions } from '../../backend/getProcessedTransactions';
import { TransactionData } from '../../constants/transaction-fetcher';

type FormInput = {
  address: string;
};

export const Body: React.FC = () => {
  const [address, setAddress] = useState('');
  const [transactions, setTransactions] = useState<TransactionData[]>();

  const { register, errors, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async data => {
    setAddress(data.address);
    const result = await fetch(data.address);
    setTransactions(result);
    console.log(result);
  };

  const [state, fetch] = useAsyncFn(async (address: string) => {
    const result = await getProcessedTransactions(address);
    return result;
  }, []);

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.container}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup label="Your wallet address" labelFor="address">
              <InputGroup
                id="address"
                placeholder="wallet address"
                name="address"
                defaultValue={address}
                inputRef={register({ required: true })}
                className={styles.addressInputGroup}
              />
              {errors.address && 'Address is required'}
            </FormGroup>
            <Button type="submit">Save</Button>
          </form>
        </div>
      </div>
      {}
      {transactions && (
        <div className={styles.wrapper}>
          <Card className={styles.root} elevation={Elevation.ONE}>
            <div className={styles.address}>{address}</div>
            <Button className={styles.editButton} minimal type="button">
              <Icon icon="edit" intent={Intent.PRIMARY} />
            </Button>
          </Card>
          <div className={styles.transactionItems}>
            <table>
              <thead>
                <tr>
                  <th>Tx Hash</th>
                  <th>Time</th>
                  <th>Sent Amount</th>
                  <th>receivedAmount</th>
                  <th>receivedAmountUSD</th>
                  <th>txFeeUSD</th>
                  <th>Event</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => {
                  return (
                    <tr key={tx.hash}>
                      <td>{tx.hash}</td>
                      <td>{tx.time}</td>
                      <td>{tx.sentAmount}</td>
                      <td>{tx.receivedAmount}</td>
                      <td>{tx.receivedAmountUSD}</td>
                      <td>${tx.txFeeUSD}</td>
                      <td>{tx.events[0]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
