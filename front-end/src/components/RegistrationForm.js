import useInput from '../hooks/useInput';
import Button from './Button'
import axios from "axios";
import {useState} from 'react';

export default function RegistrationForm(props) {
  const fistnameInput = useInput('');
  const lastnameInput = useInput('');
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const phoneInput = useInput('');
  const roleInput = useInput('');
  const [message, setMessage] = useState("");

  const register = (event) => {
    event.preventDefault();
    axios.post(process.env.REACT_APP_BACKEND_URL + "/accessControl/register", { 
        fistname: fistnameInput.value, 
        lastname: lastnameInput.value,
        email: emailInput.value, 
        password: passwordInput.value,
        phone: phoneInput.value, 
        role: roleInput.value 
      })
      .then(res => {
        props.setLoggedIn(true);
        alert("Registered");
      })
      .catch(function (error) {
        setMessage("Registration invalid");
      });
  };

  return (
    <div>
      <h2>Registration</h2>
      <br/> 
      {message}
      <br/> 
      <label>First Name:</label>
      <input 
        { ...fistnameInput }
      />
      <br/> 
      <label>Last Name:</label>
      <input 
        { ...lastnameInput }
      />
      <br/>
      <label>Phone:</label>
      <input 
        { ...phoneInput }
      />
      <br/> 
      <label>Email:</label>
      <input 
        { ...emailInput }
      />
      <br/> 
      <label>Password:</label>
      <input 
        { ...passwordInput }
      />
      <br/>
      <label>Role:</label>
      <input 
        { ...roleInput }
      />
      <br/>  
      <br/> 
      <Button onClick={register}>Register</Button>
      <br/> 
    </div>
  );
};
