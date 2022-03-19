import './App.css';
import LeTestingComponent from './components/LeTestingComponent';
import {useState} from 'react';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <LeTestingComponent loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    </div>
  );
};

export default App;
