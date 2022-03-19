import React from "react";
import Button from "./Button";

export default function Header(props) {

  const {loggedIn, setLoggedIn, mode, setMode} = props;

  return (
    <header>
      <div>
        <img alt=""/>
      </div>
      <div>
        {!loggedIn && <Button onClick={e => setMode("Login")}>Login</Button>}
        |
        {!loggedIn && <Button onClick={e => setMode("Register")}>Signup</Button>}
        {loggedIn && <Button onClick={e => setLoggedIn(false)}>Logout</Button>}
      </div>
    </header>
  )

};