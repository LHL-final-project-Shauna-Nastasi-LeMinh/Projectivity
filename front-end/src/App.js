import './App.css';
import LeTestingComponent from './components/LeTestingComponent';
import Header from './components/Header';
import {useState} from 'react';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}></Header>
      <LeTestingComponent loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    </div>
  );
};

export default App;
