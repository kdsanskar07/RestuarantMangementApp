import React from 'react';
import styles from './product.module.css';

const Product = ({ item }) => {
  return (
    <div className={styles.item}>
      <div className={styles.leftside}>
        <span>{item.itemName}</span>
        <span>{item.itemPrice}</span>
      </div>
      <div className={styles.rightside}>
        <span>Quantity - {item.quantity}</span>
      </div>
    </div>
  );
}

export default Product;