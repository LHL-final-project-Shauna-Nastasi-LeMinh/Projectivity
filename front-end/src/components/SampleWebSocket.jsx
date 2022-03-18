import {useEffect, useState} from 'react';
import socketIoClient from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;
const connection = socketIoClient(ENDPOINT);

const SampleWebSocket = () => {

  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  // 
  useEffect(() => {
    connection.on('INITIAL', (data) => {
      setUser(data.name);
      setUsers(data.users);
    })

    connection.on("NEW_USER", data => {
      setUsers(prev => [...prev, data.name]);
    })

    connection.on("DISCONNECT_USER", data => {
      console.log("DISCONNECTED", data);
      setUsers(prev => prev.filter(name => name !== data.name));
    })
    connection.on('MESSAGE', data => {
      console.log("MESSAGE", data);
      setMessages(prev => [...prev, data.message]);

    })
  }, [connection])

  const onSend = evt => {
    evt.preventDefault();
    console.log('message', evt.target.chat.value);
    setMessages(prev => [...prev, evt.target.chat.value]);
    console.log(evt.target.chat.value)
    connection.emit("message", {message: evt.target.chat.value})
  }

  return (
    <div className="App">
      {user ? <h1>Logged in as: {user}</h1> : <h1>Loading...</h1>}
      {messages.map((message) => <p>{message}</p>)}
      {users.map((user) => <li>{user}</li>)}

      <form onSubmit={onSend}>
        <input type="text" name="chat"/>
          <button>send</button>
      </form>
    </div>
  );
};

export default SampleWebSocket;
