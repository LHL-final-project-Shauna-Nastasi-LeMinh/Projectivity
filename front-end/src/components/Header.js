import React from "react";
import Button from "./Button";
import axios from "axios";

export default function Header(props) {

  const {loggedIn, setLoggedIn, mode, setMode, loggedEmail, setLoggedEmail} = props;

  const logOut = () => {
    setLoggedIn(false);
    setLoggedEmail(null);
    alert("Logged out");
    // a axios call to clear cookie session in server side too
    axios.get(process.env.REACT_APP_BACKEND_URL + "/accessControl/logout")
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <header>
      <div>
        <img alt=""/>
      </div>
      <div>
        {!loggedIn && <Button onClick={e => setMode("Login")}>Login</Button>}
        |
        {!loggedIn && <Button onClick={e => setMode("Register")}>Signup</Button>}
        {loggedIn && loggedEmail && "Logged in as: " + loggedEmail}&nbsp;
        {loggedIn && <Button onClick={logOut}>Logout</Button>}
      </div>
    </header>
  )

};