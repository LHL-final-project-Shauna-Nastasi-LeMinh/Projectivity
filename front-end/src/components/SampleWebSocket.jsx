import {useEffect, useState} from 'react';
import socketIoClient from 'socket.io-client';

const ENDPOINT = process.env.REACT_APP_BACKEND_URL;
const connection = socketIoClient(ENDPOINT);

const SampleWebSocket = () => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    connection.on('MESSAGE_CHANNEL_NAME', data => {
      console.log("MESSAGE", data);
      setMessages(prev => [...prev, data.message]);

    })
  }, [])

  const onSend = evt => {
    evt.preventDefault();
    console.log('message', evt.target.chat.value);
    setMessages(prev => [...prev, evt.target.chat.value]);
    connection.emit("MESSAGE_CHANNEL_NAME", {message: evt.target.chat.value})
  }

  return (
    <div className="App">
      <h2>WEB SOCKET TESTING SECTION DOWN HERE</h2>
      {messages.map((message) => <p>{message}</p>)}

      <form onSubmit={onSend}>
        <input type="text" name="chat"/>
          <button>send</button>
      </form>
    </div>
  );
};

export default SampleWebSocket;
