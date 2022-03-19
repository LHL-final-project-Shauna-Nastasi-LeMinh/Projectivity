import React from "react";
import {useState} from 'react';
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

export default function LeTestingComponent(props) {
   const [loggedIn, setLoggedIn] = useState(false);
   return (
      <div>
         {!loggedIn&&<LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         {!loggedIn&&<RegistrationForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
      </div>
   );
}