import React, { useState } from 'react';
import styles from './order.module.css';
import {MdDone} from 'react-icons/md';

import BillModal from '../billmodal/billmodal';

const Order = ({order,serialNumber,indextype,serveOrder}) => {
	const [show,setShow] = useState(false);

	const showModal = () => {
		setShow(true);
	}

	const hideModal = () => {
		setShow(false);
	}
	console.log("order: ",order);
	return(
		<div className={styles.order}>
			<div className={styles.leftstyle}>
				<div className={styles.serialNo} onClick={indextype===2?()=>serveOrder(order.orderId):null}>
					{indextype===1?serialNumber:indextype===2?<MdDone/>:null}
				</div>
				<div className={styles.Details} onClick={showModal}>
					{"Order#"+order.orderId} | Rs. {order.amount}
					<div>{order.email}</div>
				</div>
			</div>
			<div className={styles.rightstyle}>
				{"Date: "+order.date}
			</div>
			{show&&<BillModal order={order} hideModal={hideModal}/>}
		</div>
	);
}

export default Order;