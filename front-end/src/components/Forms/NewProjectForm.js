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
import Card from '@mui/material/Card'

export default function RegistrationForm (props) {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const { setViewMode, user, open, setOpen } = props

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const createNewProject = event => {
    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/projects/new', {
  name: name,
  description: description,
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'palette.primary.main',
    border: '2px solid palette.secondary.main',
    boxShadow: 24,
    p: 4
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-login-form'
      aria-describedby='modal-modal-login-form'
		>
      <Card sx={style}>
        <FormControl>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' }
            }}
            noValidate
            autoComplete='off'
					>
            <Typography variant='h4'>Create New Project</Typography>
            <Typography variant='h6'>
							Please enter your project details below
						</Typography>
            <Typography variant='h6' sx={{ color: 'palette.error.main' }}>
              {message}
            </Typography>
            <InputLabel htmlFor='component-error'>Project Name</InputLabel>
            <Input
              id='component-name-error'
              value={name}
              onChange={handleNameChange}
              aria-describedby='component-name-error-text'
						/>
            <FormHelperText id='component-name-error-text'>
							Error
						</FormHelperText>
            <InputLabel htmlFor='component-error'>
							Project Description
						</InputLabel>
            <Input
              id='component-description-error'
              multiline
              rows={2}
              value={description}
              onChange={handleDescriptionChange}
              aria-describedby='component-description-error-text'
						/>
            <FormHelperText id='component-description-error-text'>
							Error
						</FormHelperText>
            <Button variant='outlined' onClick={createNewProject}>
							Create Project
						</Button>
            <Button variant='outlined' onClick={() => setOpen(false)}>
							Cancel
						</Button>
          </Box>
        </FormControl>
      </Card>
    </Modal>
  )
}
