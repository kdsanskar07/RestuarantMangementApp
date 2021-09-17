import React from "react";
import styles from "./cuisinelist.module.css";


function CuisineList (props){
  const cuisineList=["Indian","South Indian","Italian","Chinese", "Thai"];
  return(
    <div className={styles.main}>
      {
        cuisineList.map(item=>{
          return(
            <div className={styles.CuisineName} onClick={()=>{props.changeCuisine(item)}} key={item}>
              {item}
            </div>
          );
        })
      }
    </div>
  );
}

export default CuisineList;