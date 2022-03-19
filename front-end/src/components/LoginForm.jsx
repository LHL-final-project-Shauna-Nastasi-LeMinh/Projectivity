import useInput from '../hooks/useInput';
import axios from "axios";
import {useState} from 'react';

export default function LoginForm(props) {
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const [message, setMessage] = useState("");

  const login = (event) => {
    event.preventDefault();
    axios.post(process.env.REACT_APP_BACKEND_URL + "/accessControl/login", { 
        email: emailInput.value, 
        password: passwordInput.value 
      })
      .then(res => {
        props.setLoggedIn(true);
        alert("Logged in");
      })
      .catch(function (error) {
        setMessage("Login invalid");
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {message}
      <form onSubmit={login}>
        <label>Email:</label>
        <input 
          { ...emailInput }
        />
        <label>Password:</label>
        <input 
          { ...passwordInput }
        />
        <button type="submit">Login!</button>
      </form>
      <br/> 
    </div>
  );
};
