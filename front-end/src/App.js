import './App.css';
// import UserInput from './components/UserInput';
// import UserRequest from './components/UserRequest';
import {useState} from 'react';
import LoginForm from './components/LoginForm';


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      {!loggedIn&&<LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}
    </div>
  );
};

export default App;
