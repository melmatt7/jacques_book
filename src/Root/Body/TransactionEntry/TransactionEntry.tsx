import React from 'react';
import styles from './TransactionEntry.module.scss';
import { Card, Elevation } from '@blueprintjs/core';

export const TransactionEntry: React.FC<{ item }> = ({ item }) => {
  return (
    <Card className={styles.root} elevation={Elevation.ZERO}>
      <div className={styles.row}>
        <div className={styles.item}>{item.block_signed_at}</div>
        <div className={styles.item}>{item.from_address}</div>
        <div className={styles.item}>{item.gas_offered}</div>
        <div className={styles.item}>{item.gas_price}</div>
        <div className={styles.item}>{item.gas_spent}</div>
        <div className={styles.item}>{item.to_address}</div>
        <div className={styles.item}>{item.tx_hash}</div>
        <div className={styles.item}>{item.value}</div>
      </div>
    </Card>
  );
};
