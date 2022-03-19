import React from "react";
import Button from "./Button";

export default function Header(props) {

  const {loggedIn, setLoggedIn} = props;

  return (
    <header>
      <div>
        <img alt=""/>
      </div>
      <div>
        {!loggedIn && <Button>Login</Button>}
        |
        {!loggedIn && <Button>Signup</Button>}
        {loggedIn && <Button>Logout</Button>}
      </div>
    </header>
  )

};