import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import NavBar from "../navBar/navbar";
import CuisineList from "./cuisinelist/cuisinelist";
import Cuisine from "./cuisine/cuisine";
import ProductModal from "./productmodal/productmodal";
import { fetchRequest } from '../../service.js';
import { useHistory } from 'react-router-dom';

function Home(props) {

  let history = useHistory();

  const { isAdmin } = (props.location && props.location.state) || {};

  // productId,cuisineId,productName,productAmount -- menuList
  let [menuList, setMenuList] = useState([]);

  // productId,quantity -- orderData
  let [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchRequest("product/getall", {}, true, false);
        let data = {};
        for (let i = 0; i < res.data.length; i = i + 1) {
          data[res.data[i][0]] = [0, 0];
        }
        setOrderData(data);
        setMenuList(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  // Below 3 function is can only used in admin view 
  const addProduct = (product) => {
    let tempMenu = menuList;
    tempMenu.push(product);
    setMenuList(tempMenu);
  }

  const updateProduct = (product) => {
    let id = product[0];
    let tempMenu = menuList;
    for (let i = 0; i < menuList.length; i++) {
      if (id === tempMenu[i][0]) {
        tempMenu[i][2] = product[2];
        tempMenu[i][3] = product[3];
        break;
      }
    }
    setMenuList(tempMenu);
  }

  const removeProduct = async (product) => {
    let tempMenu = menuList;
    try {
      let res = await fetchRequest("product/remove", { productId: product[0] }, true, true);
      if (res.success) {
        let tempMenu1 = []
        for (let i = 0; i < tempMenu.length; i++) {
          if (tempMenu[i][0] !== product[0]) {
            tempMenu1.push(tempMenu[i]);
          }
        }
        setMenuList(tempMenu1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const addItem = (item) => {
    let newOrderData = { ...orderData };
    newOrderData[item[0]][0] = orderData[item[0]][0] + 1;
    newOrderData[item[0]][1] = orderData[item[0]][1] + item[3];
    setOrderData(newOrderData);
  }

  const removeItem = (item) => {
    let newOrderData = { ...orderData };
    if (orderData[item[0]][0] > 0) {
      newOrderData[item[0]][0] = orderData[item[0]][0] - 1;
      newOrderData[item[0]][1] = orderData[item[0]][1] + item[3];
    }
    setOrderData(newOrderData);
  }

  let [selectedCuisine, setSelectedCuisine] = useState("Indian");
  const [showModal, setShowModal] = useState(false);

  const changeCuisine = (cuisineName) => {
    setSelectedCuisine(cuisineName);
  }

  const placeOrder = async () => {
    if (isAdmin) {
      setShowModal(true);
    } else {
      let amount = 0;
      let productData = [];
      let orderDataTemp = {};
      for (let m in orderData) {
        if (orderData[m][0] > 0) {
          amount = amount + orderData[m][1];
          productData.push([m, orderData[m][0]]);
        }
        orderDataTemp[m] = [0, 0];
      }
      try {
        let res = await fetchRequest("order/create", { amount: amount, productList: productData }, true, true);
        if (res.success) {
          console.log(res._id);
          setOrderData(orderDataTemp);
          history.push("/thetestkitchen/myorders");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.main}>
      <NavBar isAdmin={isAdmin} atHome={true} />
      <CuisineList selectedCuisine={selectedCuisine} changeCuisine={changeCuisine} />
      <Cuisine selectedCuisine={selectedCuisine}
        menuList={menuList} addItem={addItem}
        removeItem={removeItem} isAdmin={isAdmin}
        orderData={orderData}
        updateProduct={updateProduct}
        removeProduct={removeProduct}
      />
      <div className={styles.PlaceOrder} onClick={placeOrder}>
        {isAdmin ? "Add Item" : "Place Order"}
      </div>
      {showModal && <ProductModal name=""
        price=""
        hideModal={hideModal}
        isEdit={false}
        addProduct={addProduct}
        product={["", "", "", ""]}
        selectedCuisine={selectedCuisine} />}
    </div>
  );
}

export default Home;