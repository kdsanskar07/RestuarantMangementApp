import React, { useState, useRef } from "react";
import styles from './productmodal.module.css';
import { fetchRequest } from '../../../service.js';

const ProductModal = (props) => {


  const [allStates, setAllStates] = useState(
    {
      name: props.product[2],
      price: props.product[3],
      isSubmitDisable: !props.product[2].length && !props.product[3].length
    }
  );

  const nameRef = useRef(null);
  const priceRef = useRef(null);

  const handleCancel = (e) => {
    e.stopPropagation();
    props.hideModal();
  }

  const handleSubmit = async (e) => {
    try {
      e.stopPropagation();
      if (props.isEdit) {
        let data = { productId: props.product[0], name: allStates.name, amount: allStates.price };
        let res = await fetchRequest("product/update", data, true, true);
        if (res.success) {
          props.product[2] = allStates.name;
          props.product[3] = allStates.price;
          props.updateProduct(props.product);
          props.hideModal();
        }
      } else {
        let productData = { name: allStates.name, amount: allStates.price, cuisineName: props.selectedCuisine };
        let res = await fetchRequest("product/create", productData, true, true);
        if (res.success) {
          let temp = [];
          temp.push(res._id);
          temp.push(props.selectedCuisine);
          temp.push(allStates.name);
          temp.push(allStates.price);
          props.addProduct(temp);
          props.hideModal();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const validateFields = (ref) => {
    if (ref.current.value && ref.current.value.length > 0) {
      return true;
    }
    return false;
  }

  const handleChange = (e) => {
    if (validateFields(nameRef) && validateFields(priceRef)) {
      setAllStates({
        name: nameRef.current.value,
        price: priceRef.current.value,
        isSubmitDisable: false
      })
    } else {
      setAllStates({
        name: nameRef.current.value,
        price: priceRef.current.value,
        isSubmitDisable: true
      })
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        {props.isEdit ? "Edit Product Details" : "Add New Product"}
      </div>
      <div className={styles.body}>
        <div className={styles.inputwrapper}>
          <label>Product Name</label>
          <input ref={nameRef} onChange={handleChange} value={allStates.name}></input>
        </div>
        <div className={styles.inputwrapper}>
          <label>Amount</label>
          <input ref={priceRef} type="number" onChange={handleChange} value={allStates.price}></input>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.buttonwrapper}>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit} disabled={allStates.isSubmitDisable}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;