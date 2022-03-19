import useInput from '../hooks/useInput';
import Button from './Button'
import axios from "axios";
import {useState, useEffect} from 'react';

export default function RegistrationForm(props) {
  const firstnameInput = useInput('');
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
        const roleOptions = result.data.map(role => <option value={role.id} key={role.id}>{role.name}</option>)
        setRole(result.data[0].id);
        setRoles(roleOptions);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const register = (event) => {
    event.preventDefault();
    
    if (firstnameInput.value === "") {
      setMessage("Please enter first name");
      return;
    }
    if (lastnameInput.value === "") {
      setMessage("Please enter last name");
      return;
    }
    if (phoneInput.value === "") {
      setMessage("Please enter phone number");
      return;
    }
    const emailReg = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    if (emailInput.value === "" || !emailReg.test(emailInput.value)) {
      setMessage("Please enter correct email address");
      return;
    }
    if (passwordInput.value === "") {
      setMessage("Please enter password");
      return;
    }
    
    axios.post(process.env.REACT_APP_BACKEND_URL + "/accessControl/register", { 
        first_name: firstnameInput.value, 
        last_name: lastnameInput.value,
        email: emailInput.value, 
        password: passwordInput.value,
        phone: phoneInput.value, 
        role_id: role 
      })
      .then(res => {
        props.setLoggedIn(true);
        alert(res.data.email + " registered");
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
        { ...firstnameInput }
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
      <input type="password" 
        { ...passwordInput }
      />
      <br/>
      <label>Role:</label>
      <select value={role} onChange={e => setRole(e.target.value)}>
        {roles}
      </select>
      <br/>  
      <br/> 
      <Button onClick={register}>Register</Button>
      <br/> 
    </div>
  );
};
