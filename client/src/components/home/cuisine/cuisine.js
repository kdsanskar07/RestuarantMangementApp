import React, { useState } from "react";
import {MdAddBox,MdIndeterminateCheckBox,MdEdit,MdDeleteForever} from "react-icons/md";
import styles from "./cuisine.module.css";
import ProductModal from "../productmodal/productmodal";



function Cuisine(props){
  let counter=0;
  const [showModal, setShowModal] = useState(false);

  let [selectedproduct,setSelectedProduct]=useState([]);

  const hideModal = () => {
    setShowModal(false);
  }

  const displayModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  }

  return (
    <div className={styles.Main}>
      <div className={styles.CuisineTitle}>
        {props.selectedCuisine}
      </div>
      {
        props.menuList.map((item)=>{
          counter=item[1]===props.selectedCuisine?counter+1:counter;
          return(
            item[1]===props.selectedCuisine?
              <div className={styles.CuisineItem} key={item[0]}>
                <div className={styles.ItemCheckBox}>
                  <div className={styles.CheckBox}>
                    {counter}
                  </div>
                  <div className={styles.CheckBoxLabel}>{item[2]+" | Rs. "+item[3]}</div>
                </div>
                {
                  props.isAdmin?
                  <div className={styles.AdminControl}>
                    <div className={styles.EditIcon} onClick={() => displayModal(item)}>
                      <MdEdit/>
                    </div>
                    <div className={styles.EditIcon} onClick={()=>props.removeProduct(item)}>
                      <MdDeleteForever/>
                    </div>
                  </div>:
                  <div className={styles.QuantityController}>
                    <MdAddBox onClick={()=>props.addItem(item)} className={styles.ControllerIcon}/>
                    {props.orderData[item[0]][0]}
                    <MdIndeterminateCheckBox onClick={()=>{props.removeItem(item)}} className={styles.ControllerIcon}/>
                  </div>
                }
              </div>
            :null
          );
        })
      }
      {showModal&& <ProductModal product={selectedproduct} hideModal={hideModal} isEdit={true} updateProduct={props.updateProduct}/>}
    </div>
  );
}

export default Cuisine;