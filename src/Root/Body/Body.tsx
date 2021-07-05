import React, { useState } from 'react';
import { Button, Card, Elevation, FormGroup, Icon, InputGroup, Intent } from '@blueprintjs/core';
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
    console.log(result);
    setTransactions(result);
  };

  const [state, fetch] = useAsyncFn(async (address: string) => {
    const result = await getProcessedTransactions(address);
    return result;
  }, []);

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup label="Your wallet address" labelFor="address">
            <InputGroup
              id="address"
              placeholder="wallet address"
              name="address"
              defaultValue={address}
              inputRef={register({ required: true })}
            />
            {errors.address && 'Address is required'}
          </FormGroup>
          <Button type="submit">Save</Button>
        </form>
      </div>
      {transactions && (
        <div>
          <Card elevation={Elevation.ONE}>
            <div>{address}</div>
            <Button minimal type="button">
              <Icon icon="edit" intent={Intent.PRIMARY} />
            </Button>
          </Card>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Tx Hash</th>
                  <th>Time</th>
                  <th>SentAmount</th>
                  <th>SentAmountUSD</th>
                  <th>ReceivedAmount</th>
                  <th>ReceivedAmountUSD</th>
                  <th>txFeeUSD</th>
                  <th>Event</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => {
                  return (
                    <tr key={tx.txHash}>
                      <td>{tx.txHash}</td>
                      <td>{tx.time}</td>
                      <td>
                        {tx.sentAmount.toFixed(6)} {tx.sentTokenSymbol}
                      </td>
                      <td>${tx.sentAmountUSD}</td>
                      <td>
                        {tx.receivedAmount.toFixed(6)} {tx.receivedTokenSymbol}
                      </td>
                      <td>${tx.receivedAmountUSD}</td>
                      <td>${tx.txFeeUSD}</td>
                      <td>{tx.events}</td>
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
