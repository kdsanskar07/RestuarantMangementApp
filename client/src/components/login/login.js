import React,{useState} from "react";
import styles from "./login.module.css";
import {MdEmail} from "react-icons/md";
import { useHistory } from "react-router-dom";
import {fetchRequest} from '../../service.js'

function Login(props){

  const history = useHistory();

  let [isValid,setIsValid]=useState(true);

  let [userEmail,setUserEmail] = useState("");

  const handelChange = (event)=>{
    setUserEmail(event.target.value);
  }

  const checkEmail = (email)=>{
    if(email===""){
      return false;
    }
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (pattern.test(email)) {
      return true;
    }
    return false;
  }

  const handelSubmit = async (event)=>{
    event.preventDefault();
    if(checkEmail(userEmail)){
      const data = await fetchRequest("auth/login",{email:userEmail},false,true);
      console.log(data);
      localStorage.setItem('token', data.token);
      setUserEmail("");
      setIsValid(true);
      history.push({pathname:"/thetestkitchen",state:{isAdmin:data.isOwner}});
    }else{
      setIsValid(false);
    }
  }

  return(
    <div className={styles.Main}>
      <div className={styles.LoginForm}>
        <div className={styles.RestaurantName}>
          The Test Kitchen
        </div>
        <div className={styles.LineBreak}></div>
        <div className={styles.InputLabel}>Enter Your Email :</div>
        <div className={styles.Input}>
          <div className={styles.EmailIcon}><MdEmail/></div>
          <input type="text" onChange={handelChange} value={userEmail}/>
        </div>
        {!isValid?<div className={styles.ErrorMsg}>Enter a valid Email</div>:null}
        <div className={styles.SubmitButton} onClick={handelSubmit}>
          Proceed
        </div>
      </div>
    </div>
  ); 
}
export default Login;