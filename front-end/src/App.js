import './App.css';
import LeTestingComponent from './components/LeTestingComponent';
import Header from './components/Header';
import {useState} from 'react';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState("");
  const [loggedEmail, setLoggedEmail] = useState("");

  return (
    <div className="App">
      <Header 
        loggedIn={loggedIn} 
        setLoggedIn={setLoggedIn} 
        mode={mode} setMode={setMode} 
        loggedEmail={loggedEmail} 
        setLoggedEmail={setLoggedEmail}
      />
      <LeTestingComponent 
        loggedIn={loggedIn} 
        setLoggedIn={setLoggedIn} 
        mode={mode}
        setLoggedEmail={setLoggedEmail}
      />
    </div>
  );
};

export default App;
