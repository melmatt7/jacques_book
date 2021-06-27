import React, { useState } from 'react';
import styles from './Body.module.scss';
import { AddressInput } from './AddressInput/AddressInput';
import { AccountEditOverlay } from './AccountEditOverlay/AccountEditOverlay';

export type DataResponse = {
  address: string;
  items: Transaction[];
};

export type Transaction = {
  block_signed_at: string;
  from_address: string;
  gas_offered: number;
  gas_price: number;
  gas_spent: number;
  to_address: string;
  tx_hash: string;
  value: string;
};

const BodyContent: React.FC<{
  dataResponse: DataResponse;
  showOverlay: () => void;
}> = ({ dataResponse, showOverlay }) => {
  return (
    <div className={styles.wrapper}>
      <AddressInput address={dataResponse.address} showOverlay={showOverlay} />
      <div className={styles.transactionItems}>
        <table>
          <thead>
            <tr>
              <th>tx_hash</th>
              <th>block_signed_at</th>
              <th>from_address</th>
              <th>gas_offered</th>
              <th>gas_price</th>
              <th>gas_spent</th>
              <th>to_address</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            {dataResponse.items.map(tx => {
              return (
                <tr key={tx.tx_hash}>
                  <td>{tx.tx_hash}</td>
                  <td>{tx.block_signed_at}</td>
                  <td>{tx.from_address}</td>
                  <td>{tx.gas_offered}</td>
                  <td>{tx.gas_price}</td>
                  <td>{tx.gas_spent}</td>
                  <td>{tx.to_address}</td>
                  <td>{tx.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const Body: React.FC = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [transactions, setTransactions] = useState<any>();

  return (
    <div className={styles.root}>
      {transactions && transactions.items && (
        <BodyContent
          dataResponse={transactions}
          showOverlay={() => {
            setIsOverlayVisible(true);
          }}
        />
      )}
      <div style={{ display: isOverlayVisible ? 'block' : 'none' }}>
        <AccountEditOverlay
          setTransactions={setTransactions}
          transactions={transactions}
          hideOverlay={() => setIsOverlayVisible(false)}
        />
      </div>
    </div>
  );
};
