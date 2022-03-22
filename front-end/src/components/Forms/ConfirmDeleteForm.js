import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { PROJECT_VIEW } from '../constants/Modes'

export default function ConfirmDeletedForm (props) {
  const [message, setMessage] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleChange = event => {
    setConfirm(event.target.value)
  }

  const {
		currentProject,
		data,
		setViewMode,
		user,
		setUser,
		setCookie,
		open,
		setOpen
	} = props

  const delete_confirmed = event => {
    if (confirm === 'DELETE') {
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
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen('')}
      aria-labelledby='modal-login-form'
      aria-describedby='modal-modal-login-form'
		>
      <FormControl>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' }
          }}
          noValidate
          autoComplete='off'
				>
          <Typography variant='h4'>Project Deletion</Typography>
          <Typography variant='h6' sx={{ color: 'palette.warning.main' }}>
						You are about to delete the following project: {currentProject}
          </Typography>
          <Typography variant='h6' sx={{ color: 'palette.error.main' }}>
            {message}
          </Typography>
          <InputLabel htmlFor='component-error'>
						Type DELETE here before confirming
					</InputLabel>
          <Input
            id='component-error'
            value={confirm}
            onChange={handleChange}
            aria-describedby='component-error-text'
					/>
          <FormHelperText id='component-error-text'>Error</FormHelperText>
          <Button variant='outlined' onClick={delete_confirmed}>
						Confirm Delete
					</Button>
          <Button variant='outlined' onClick={() => setOpen('')}>
						Cancel
					</Button>
        </Box>
      </FormControl>
    </Modal>
  )
}
