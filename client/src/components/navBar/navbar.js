import React from 'react';
import styles from './navbar.module.css'
import { useHistory } from "react-router-dom";

function NavBar(props){

  const history = useHistory();
  const orderPath=props.isAdmin?"/thetestkitchen/orders/":"/thetestkitchen/myorders/";

  const moveToHome = ()=>{
    if(!props.atHome){
      history.goBack();
    }
  }

  return(
    <div className={styles.Main}>
      <div className={styles.RestaurantName} onClick={moveToHome}>
        The Test Kitchen
      </div>
      {/* <div className={styles.leftHalf}> */}
        {/* <div className={styles.OrdersButton}>
          Orders |
        </div> */}
        <div className={styles.Order} onClick={()=>{history.push({pathname:orderPath,state:{atHome:false}})}}>
          Orders
        </div>
      {/* </div> */}
    </div>
  );
}

export default NavBar;

