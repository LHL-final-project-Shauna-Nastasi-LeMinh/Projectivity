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
  const [message, setMessage] = useState("");
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/roles")
      .then(result => {
        const roleOptions = [];
        for (let i = 0; i < result.data.length; i++) {
          const role = result.data[i];
          if (i === 0) {
            roleOptions.push(<option defaultValue={role.id} key={role.id} >{role.name}</option>);
          } else {
            roleOptions.push(<option value={role.id} key={role.id}>{role.name}</option>);
          }
        } 

        setRoles(roleOptions);
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
        role_id: role 
      })
      .then(res => {
        props.setLoggedIn(true);
        alert("Registered");
      })
      .catch(function (error) {
        console.log(error.message)
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
      <select name="role" id="rold-id" onChange={e => setRole(e.target.value)}>
        {roles}
      </select>
      <br/>  
      <br/> 
      <Button onClick={register}>Register</Button>
      <br/> 
    </div>
  );
};
