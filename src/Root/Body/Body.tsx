import React, { useState, useMemo } from 'react';
import { Button, Card, Elevation, FormGroup, Icon, InputGroup, Intent } from '@blueprintjs/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAsyncFn } from 'react-use';
import { getProcessedTransactions, ProcessedResponse } from '../../backend/processTransactions';
import { TransactionData } from '../../constants/transaction-fetcher';
import { Row, Col, Container } from 'react-bootstrap';
import { useTable } from 'react-table';

type FormInput = {
  address: string;
};

export const Body: React.FC = () => {
  const [address, setAddress] = useState('');
  let [transactions, setTransactions] = useState<ProcessedResponse[]>();

  const { register, errors, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async data => {
    setAddress(data.address);
    const result = await fetch(data.address);
    setTransactions(result);
  };

  const [state, fetch] = useAsyncFn(async (address: string) => {
    const result = await getProcessedTransactions(address);
    console.log(result);
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
      {/* <table {...getTableProps()}>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>...</tr>
        ))}
      </table> */}
      <Container>
        <Row>
          <div id="wrap" className="wrap" draggable="true">
            <Col>
              {transactions && (
                <table className="table">
                  <caption>
                    <h4>Transaction History</h4>
                  </caption>
                  <thead className="t_sortable">
                    <tr>
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
                    {transactions?.map(tx => {
                      return (
                        <tr key={tx.txHash} draggable="true" className="drag-row row-1">
                          <td>{tx.time}</td>
                          <td>{tx.time}</td>
                          <td>${tx.receivedTokenBalances}</td>
                          <td>{/* {tx.receivedAmount.toFixed(6)} {tx.receivedTokenSymbol} */}</td>
                          {/* <td>${tx.receivedAmountUSD}</td> */}
                          <td>${tx.txFeeUSD}</td>
                          <td>{tx.events}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </Col>
            <Col>
              {transactions && (
                <div>
                  <table className="table tb-2">
                    <caption>
                      <h4>Plays</h4>
                    </caption>
                    <thead className="t_sortable">
                      <tr>
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
                      <tr draggable="true" className="drag-row row-2"></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
};
