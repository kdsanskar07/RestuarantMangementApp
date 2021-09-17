import React from 'react';
import styles from './billmodal.module.css';

import Product from '../productcard/product';

const BillModal = ({ order, hideModal }) => {

	const items = order.productList;

	const handleCancelClick = (e) => {
		e.stopPropagation();
		hideModal();
	}

	return (
		<div className={styles.modal}>
			<div className={styles.header}>
				<div className={styles.headerleftspan}>
					<span><b>{order.orderId}</b></span>
					<span>{order.email}</span>
				</div>
				<div className={styles.headerrightspan}>
					<span>Order Date: {order.date}</span>
				</div>
			</div>
			<div className={styles.body}>
				{items.map(item => (
					<Product item={item} />
				))}
			</div>
			<div className={styles.footer}>
				<span>Order total: {order.amount}</span>
				<button onClick={handleCancelClick}>Close</button>
			</div>
		</div>
	);
}

export default BillModal;