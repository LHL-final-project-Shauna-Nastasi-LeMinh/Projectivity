import React from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

export default function LeTestingComponent(props) {
   const {loggedIn, setLoggedIn, mode} = props;
   return (
      <div>
         {mode==="Login" && <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         {mode==="Register" && <RegistrationForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
      </div>
   );
}