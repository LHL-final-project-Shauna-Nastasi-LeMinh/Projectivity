import './App.css';
import UserInput from './components/UserInput';
import UserRequest from './components/UserRequest';
import SampleWebSocket from './components/SampleWebSocket'

const App = () => {
  return (
    <div className="App">
      <h2>Skeleton Code</h2>
      <UserRequest />
      <br/><br/><br/><br/><br/>
      <UserInput />
      <br/><br/><br/><br/><br/>
      <SampleWebSocket />
    </div>
  );
};

export default App;
