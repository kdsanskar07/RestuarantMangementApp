import React from 'react';
import styles from './app.module.css';
import Login from './components/login/login';
import Home from './components/home/home';
import AdminView from './components/orders/adminview/adminview';
import { Route } from 'react-router-dom';
import UserView from './components/orders/userview/userview';

function App(props) {
  return (
    <div className={styles.App}>
      <Route component={AdminView} exact={true} path="/thetestkitchen/orders"/>
      <Route component={UserView} exact={true} path="/thetestkitchen/myorders"/>
      <Route component={Home} exact={true} path="/thetestkitchen/"/>
      <Route component={Login} exact={true} path="/" />
    </div>
  );
}

export default App;
