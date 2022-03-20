import useInput from '../hooks/useInput';
import Button from './Button'
import axios from "axios";
import {useState} from 'react';

export default function LoginForm(props) {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const [message, setMessage] = useState("");

  const login = (event) => {
    event.preventDefault();
    const emailReg = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    if (emailInput.value === "" || !emailReg.test(emailInput.value)) {
      setMessage("Please enter correct email address");
      return;
    }
    if (passwordInput.value === "") {
      setMessage("Please enter password");
      return;
    }
    axios.post(process.env.REACT_APP_BACKEND_URL + "/accessControl/login", { 
        email: emailInput.value, 
        password: passwordInput.value 
      })
      .then(res => {
        props.setLoggedIn(true);
        props.setLoggedEmail(res.data.email);
        alert(res.data.email + " logged in");
      })
      .catch(function (error) {
        console.log(error.message)
        setMessage("Login invalid");
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <br/>
      {message}
      <br/>
      <label>Email:</label>
      <br/>
      <input
        { ...emailInput }
      />
      <br/>
      <label>Password:</label>
      <br/>
      <input type="password" 
        { ...passwordInput }
      />
      <br/>
      <Button onClick={login}>Login</Button>
      <br/> 
    </div>
  );
};
