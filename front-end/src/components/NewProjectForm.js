import useInput from '../hooks/useInput'
import Button from './Button'
import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { PROJECT_VIEW } from './constants/Modes'

export default function RegistrationForm (props) {
  const projectNameInput = useInput('')
  const projectDescriptionInput = useInput('')
  const [message, setMessage] = useState('')
  const [roles, setRoles] = useState([])
  const [role, setRole] = useState('')
  const { setViewMode, user, setUser, setCookie } = props

  function createNewProject () {
    if (projectNameInput.value === '') {
      setMessage('Please enter a project name')
    }

    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/projects/new', {
  name: projectNameInput.value,
  description: projectDescriptionInput.value,
  employee_id: user.id
})
			.then(res => {
  setViewMode(PROJECT_VIEW)
})
			.catch(function (error) {
  console.log(error.message)
  setMessage('Failed to create project')
})
  }

  return (
    <div>
      <h2>New Project</h2>
      {message}
      <br />
      <br />
      <label>Project Name:</label>
      <input {...projectNameInput} />
      <br />
      <label>Project Description:</label>
      <input {...projectDescriptionInput} />
      <br />
      <Button onClick={() => createNewProject()}>Create New Project</Button>
      <Button onClick={() => setViewMode(PROJECT_VIEW)}>Cancel</Button>
    </div>
  )
}
