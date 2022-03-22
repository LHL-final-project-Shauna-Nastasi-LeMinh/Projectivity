import React, {useState} from "react"
import axios from 'axios'
import useInput from '../hooks/useInput'
import Button from "./Button";
import { PROJECT_VIEW } from './constants/Modes'


export default function NewTicketForm (props) {

  const {user, setViewMode, currentColumn} = props;

  const ticketTitleInput = useInput('')
  const [message, setMessage] = useState('')
  
  const onAdd = (evt) => {
    evt.preventDefault();

    if (!ticketTitleInput.value.length) {
      setMessage('Please enter a ticket description')
      return;
    } 
    
    // add new ticket to db 
    axios
			.post(process.env.REACT_APP_BACKEND_URL + "/tickets/new", {
        title: ticketTitleInput.value,
        created_by: user.id,
        column_id: currentColumn
        
    })
			.then(res => {
        setViewMode(PROJECT_VIEW);
      })
			.catch(function (error) {
        console.log(error.message)
        setMessage('Failed to create new ticket')
    })
  }

  return (
    <div>
      <h2>Create New Ticket</h2>
      <br />
      {message}

      <br/>
      
      <label>Ticket Description:</label>
      <input {...ticketTitleInput} />
      <br />
      <Button onClick={(evt)=> onAdd(evt)}>Create New Ticket</Button>
      <Button onClick={() => setViewMode(PROJECT_VIEW)}>Cancel</Button>
    </div>
  )
}