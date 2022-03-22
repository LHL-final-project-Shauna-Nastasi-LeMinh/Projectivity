import axios from 'axios'
import { useEffect, useState } from 'react'
import Pusher from 'pusher-js'

const UserInput = () => {
  const firstnameInput = useInput('')
  const lastnameInput = useInput('')
  const [messages, setMessages] = useState([])

  const handleSubmit = event => {
    event.preventDefault()
    axios
			.put(process.env.REACT_APP_BACKEND_URL + '/users', {
  firstname: firstnameInput.value,
  lastname: lastnameInput.value
})
			.then(res => {
  alert('New record has been saved to USERS table')
})
  }

	// WebSocket code start - subscribe to Pusher channel
  useEffect(() => {
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER
    })
    const channel = pusher.subscribe('USER_CHANNEL')
    channel.bind('USER_SAVED_EVENT', function (data) {
      setMessages(prev => [...prev, JSON.stringify(data.user)])
    })
  }, [])
	// WebSocket code end

  return (
    <div>
      <h2>PUT/POST AXIOS REQUEST TO SEQUELIZE DB</h2>

      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input {...firstnameInput} />
        <label>Last Name:</label>
        <input {...lastnameInput} />
        <button type='submit'>Save!</button>
      </form>
      <br />
      <h2>WEBSOCKET VIA PUSHER SERVER DEMO DOWN HERE</h2>
      {messages.map(message =>
        <p>
          {message}
        </p>
			)}
    </div>
  )
}

export default UserInput
