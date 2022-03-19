import useInput from '../hooks/useInput';
import Button from './Button'
import axios from "axios";
import {useState, useEffect} from 'react';

export default function RegistrationForm(props) {
  const fistnameInput = useInput('');
  const lastnameInput = useInput('');
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const phoneInput = useInput('');
  const roleInput = useInput('');
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/roles")
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  const register = (event) => {
    event.preventDefault();
    axios.post(process.env.REACT_APP_BACKEND_URL + "/accessControl/register", { 
        first_name: fistnameInput.value, 
        last_name: lastnameInput.value,
        email: emailInput.value, 
        password: passwordInput.value,
        phone: phoneInput.value, 
        role_id: roleInput.value 
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
      <select name="role_id" id="rold_id">
        <option value="1">Manager</option>
        <option value="2">Developer</option>
      </select>
      <br/>  
      <br/> 
      <Button onClick={register}>Register</Button>
      <br/> 
    </div>
  );
};
