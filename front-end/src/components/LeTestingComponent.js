import React from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import {LOGIN, REGISTER} from './constants/Modes'

export default function LeTestingComponent(props) {
   const {loggedIn, setLoggedIn, mode, setLoggedEmail} = props;
   return (
      <div>
         {mode===LOGIN && loggedIn===false && <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} setLoggedEmail={setLoggedEmail}/>}
         <br/>
         <br/>
         <br/>
         <br/>
         <br/>
         {mode===REGISTER && <RegistrationForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} setLoggedEmail={setLoggedEmail}/>}
      </div>
   );
}