import useInput from '../hooks/useInput'
import Button from './Button'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CONFIRM_DELETE_PROJECT, PROJECT_VIEW } from './constants/Modes'

export default function ConfirmDeletedForm (props) {
  const projectNameInput = useInput('')
  const projectDescriptionInput = useInput('')
  const [message, setMessage] = useState('')
  const [roles, setRoles] = useState([])
  const [role, setRole] = useState('')
  const { currentProject, setViewMode, user, setUser, setCookie } = props

  const ConfirmDeleteForm = event => {
    event.preventDefault()
  }

  function delete_confirmed () {
    if (projectNameInput.value === '') {
      setMessage('Please enter a project name')
    }

    axios
			.delete(
				process.env.REACT_APP_BACKEND_URL + `/projects/${currentProject.id}`,
      {
        project_id: currentProject.id
      }
			)
			.then(res => {})
			.catch(function (error) {
  console.log(error.message)
  setMessage('Failed to create project')
})
  }

  return (
    <div>
      <h2>Are you sure you want to delete this project?</h2>
      {currentProject.name}
      {message}
      <br />
      <br />
      <label>Type "DELETE" in the input field below before confirming:</label>
      <input {...projectNameInput} />
      <br />
      <label>Project Description:</label>
      <input {...projectDescriptionInput} />
      <br />
      <Button onClick={() => delete_confirmed()}>Confirm Delete</Button>
    </div>
  )
}
