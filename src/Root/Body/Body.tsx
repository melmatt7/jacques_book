import React, { useState } from 'react';
import styles from './Body.module.scss';
import { TransactionEntry } from './TransactionEntry/TransactionEntry';
import { AddressInput } from './AddressInput/AddressInput';
import { AccountEditOverlay } from './AccountEditOverlay/AccountEditOverlay';

export type Transactions = {
  address: string;
  items: Transaction[];
}

export type Transaction = {
  block_signed_at: string,
  from_address: string,
  gas_offered: number,
  gas_price: number,
  gas_spent: number,
  to_address: string,
  tx_hash: string,
  value: string
};


const BodyContent: React.FC<{
  transactions: Transactions;
  // transactions: Transactions;
  showOverlay: () => void;
}> = ({ transactions, showOverlay }) => {

  return (
    <div className={styles.wrapper}>
      <AddressInput address={transactions.address} showOverlay={showOverlay} />
      <div className={styles.transactionItems}>
        {transactions.items.map((item: Transaction) => (
          <TransactionEntry item={item}  />
        ))}
      </div>
    </div>
  );
};

export const Body: React.FC = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);
  const [transactions, setTransactions] = useState<any>();
  // const [transactions, setTransactions] = useState<any>();


  return (
    <div className={styles.root}>
      {transactions && transactions.items && (
        <BodyContent
        transactions={transactions}
          // transactions={transactions}
          showOverlay={() => {
            setIsOverlayVisible(true);
          }}
        />
      )}
      <div style={{ display: isOverlayVisible ? 'block' : 'none' }}>
        <AccountEditOverlay
          setTransactions={setTransactions}
          // setTransactions={setTransactions}
          transactions={transactions}
          // transactions={transactions}
          hideOverlay={() => setIsOverlayVisible(false)}
        />
      </div>
    </div>
  );
};
