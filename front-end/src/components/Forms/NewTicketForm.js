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

export default function NewTicketForm (props) {
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { user, setViewMode, currentColumn, open, setOpen } = props

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleDescriptionChange = event => {
    setDescription(event.target.value)
  }

  const onAdd = event => {
    event.preventDefault()
		// add new ticket to db
    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/tickets/new', {
        title: title,
        description: description,
        created_by: user.id,
        column_id: currentColumn
      })
			.then(res => {
        setViewMode(PROJECT_VIEW)
        setOpen(false)
})
			.catch(function (error) {
        console.log(error.message)
        setMessage('Failed to create new ticket')
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
            <Typography variant='h4'>Create New Ticket</Typography>
            <Typography variant='h6'>
							Please enter your ticket details below
						</Typography>
            <Typography variant='h6' sx={{ color: 'palette.error.main' }}>
              {message}
            </Typography>
            <InputLabel htmlFor='component-error'>Ticket Title</InputLabel>
            <Input
              id='component-title-error'
              value={title}
              onChange={handleTitleChange}
              aria-describedby='component-title-error-text'
						/>
            <FormHelperText id='component-title-error-text'>
							Error
						</FormHelperText>
            <InputLabel htmlFor='component-error'>
							Ticket Description
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
            <Button variant='outlined' onClick={evt => onAdd(evt)}>
							Create Ticket
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
