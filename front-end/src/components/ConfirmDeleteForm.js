import useInput from '../hooks/useInput'
import Button from './Button'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CONFIRM_DELETE_PROJECT, PROJECT_VIEW } from './constants/Modes'

export default function ConfirmDeletedForm (props) {
  const deleteConfirmInput = useInput('')
  const [message, setMessage] = useState('')
  const [roles, setRoles] = useState([])
  const [role, setRole] = useState('')
  const { currentProject, data, setViewMode, user, setUser, setCookie } = props

  const ConfirmDeleteForm = event => {
    event.preventDefault()
  }

  function delete_confirmed () {
    if (deleteConfirmInput.value !== 'DELETE') {
      return setMessage(
				'You must enter the text "DELETE" into the input field'
			)
    }

    axios
			.delete(
				process.env.REACT_APP_BACKEND_URL + `/projects/${data.id}/delete`,
      {
        project_id: data.id
      }
			)
			.then(res => {
  setViewMode(PROJECT_VIEW)
})
			.catch(function (error) {
  console.log(error.message)
  setMessage('Failed to delete project')
})
  }

  return (
    <div>
      <h2>
				Are you sure you want to delete the following project: {data.name}{' '}
      </h2>
      {message}
      <br />
      <br />
      <label>Type "DELETE" in the input field below before confirming:</label>
      <input {...deleteConfirmInput} />
      <br />
      <br />
      <Button onClick={() => delete_confirmed()}>Confirm Delete</Button>
    </div>
  )
}
