import React, { useEffect, useState } from 'react';
import styles from './userview.module.css';
import Order from '../ordercard/order';
import NavBar from '../../navBar/navbar';
import { fetchRequest } from '../../../service.js';

const UserView = (props) => {

	const { atHome } = (props.location && props.location.state) || {};
	const [ordersData, setOrdersData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await fetchRequest("order/userorder", {}, true, false);
				console.log(res);
				setOrdersData(res.data);
			} catch (error) {
				console.log(error);
			}
		}
		getData();
	}, []);

	return (
		<div className={styles.main}>
			<NavBar isAdmin={props.isAdmin} atHome={atHome} />
			<div className={styles.orders}>
				<div className={styles.ordertitle}>Past Orders</div>
				<div className={styles.orderlist}>
					{
						ordersData.map((order, index) => (
							<Order order={order} indextype={1} serialNumber={index + 1} />
						))
					}
				</div>
			</div>
		</div>
	);
}

export default UserView;