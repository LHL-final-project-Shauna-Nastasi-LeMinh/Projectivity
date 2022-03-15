import useInput from '../hooks/useInput';
import axios from "axios";

const UserInput = () => {
  const firstnameInput = useInput('');
  const lastnameInput = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(process.env.REACT_APP_BACKEND_URL + "/users", { 
        firstname: firstnameInput.value, 
        lastname: lastnameInput.value 
      })
      .then(res => {
        alert("New record has been saved to USERS table");
      });
  };

  return (
    <div>
      <h2>PUT REQUEST SAMPLE</h2>

      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input 
          { ...firstnameInput }
        />
        <label>Last Name:</label>
        <input 
          { ...lastnameInput }
        />
        <button type="submit">Save!</button>
      </form>
    </div>
  );
};

export default UserInput;
