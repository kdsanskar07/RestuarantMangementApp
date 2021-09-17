import React, { useEffect, useState } from 'react';
import styles from './adminview.module.css';
import NavBar from '../../navBar/navbar';
import Order from '../ordercard/order';
import { fetchRequest } from '../../../service';

const AdminView = (props) => {
	const { atHome } = (props.location && props.location.state) || {};

	const [orderList, setOrderList] = useState([]);

	const getData = async () => {
		try {
			const res = await fetchRequest("order/ownerorder", null, true, false);
			setOrderList(res.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getData();
	}, []);


	const serveOrder = async (orderId) => {
		try {
			const res = await fetchRequest("order/servefood", { orderId: orderId }, true, true);
			if (res.success === true) {
				getData();
			}
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className={styles.main}>
			<NavBar isAdmin={props.isAdmin} atHome={atHome} />
			<div className={styles.orders}>
				<div className={styles.ordertitle}>Yet To Complete</div>
				{
					orderList.map((order) => {
						return (
							order.isCompleted === false ? <Order order={order} indextype={3} serveOrder={serveOrder} /> : null
						);
					})
				}
				<div className={styles.ordertitle} style={{ marginTop: "2%" }}>Completed</div>
				{
					orderList.map((order) => {
						return (
							order.isCompleted === true ? <Order order={order} indextype={2} /> : null
						);
					})
				}
			</div>
		</div>
	);
}

export default AdminView;