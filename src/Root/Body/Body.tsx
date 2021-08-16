import React, { useState, useMemo } from 'react';
import { Button, Card, Elevation, FormGroup, Icon, InputGroup, Intent } from '@blueprintjs/core';
// import {  } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAsyncFn } from 'react-use';
import { getProcessedTransactions } from '../../backend/getProcessedTransactions';
import { TransactionData } from '../../constants/transaction-fetcher';
import { Row, Col, Container } from 'react-bootstrap';
import { useTable } from 'react-table';

type FormInput = {
  address: string;
};

// function handleDragStart(e) {
// 	drag = this;
// 	e.dataTransfer.effectAllowed = 'move';
// 	e.dataTransfer.setData('text/html', this.innerHTML);
// }

// function handleDragOver(e) {
// 	if (e.preventDefault) {
// 		e.preventDefault();
// 	}

// 	return false;
// }

// function handleDragEnter(e) {
// 	this.classList.add('over');
// }

// function handleDragLeave(e) {
// 	this.classList.remove('over');
// }

// function handleDrop(e) {
// 	if (e.stopPropagation) {
// 		e.stopPropagation();
// 	}
//   if (this.className == "wrap") {
//     drag.parentNode.removeChild(drag);
//   } else if (drag.parentNode.parentNode.className != this.parentNode.parentNode.className) {
//     this.parentNode.appendChild(drag);
// 	}

// 	return false;
// }

// function handleDragEnd(e) {
// 	for (var i = 0; i < rows.length; i++) {
// 		rows[i].classList.remove('over');
// 	}
// }

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

  // const data = useMemo(() => transactions, []);
  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: 'TxHash',
  //       accessor: 'txHash',
  //     },
  //     {
  //       Header: 'Time',
  //       accessor: 'time',
  //     },

  //     {
  //       Header: 'Sent Amount',
  //       accessor: 'sentAmount',
  //     },
  //     {
  //       Header: 'sentAmountUSD',
  //       accessor: 'sentAmountUSD',
  //     },
  //     {
  //       Header: 'sentTokenSymbol',
  //       accessor: 'sentTokenSymbol',
  //     },
  //     {
  //       Header: 'receivedAmount',
  //       accessor: 'receivedAmount',
  //     },
  //     {
  //       Header: 'receivedAmountUSD',
  //       accessor: 'receivedAmountUSD',
  //     },
  //     {
  //       Header: 'receivedTokenSymbol',
  //       accessor: 'receivedTokenSymbol',
  //     },
  //     {
  //       Header: 'txFeeUSD',
  //       accessor: 'txFeeUSD',
  //     },
  //     {
  //       Header: 'events',
  //       accessor: 'events',
  //     },
  //   ],
  //   [],
  // );

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

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
