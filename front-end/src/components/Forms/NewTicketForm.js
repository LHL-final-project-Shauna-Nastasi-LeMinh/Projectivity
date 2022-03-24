import React, { useState } from 'react'
import axios from 'axios'
import {
	Button,
	Modal,
	Typography,
	Box,
	TextField,
	Divider,
	Paper
} from '@mui/material'
import { AddBox } from '@mui/icons-material'
import { PROJECT_VIEW } from '../constants/Modes'

export default function NewTicketForm (props) {
  const {
		user,
		currentColumn,
		dialogOpen,
		setDialogOpen,
		tickets,
		setTickets
	} = props
  const [values, setValues] = useState({
    message: '',
    title: undefined,
    description: undefined
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const onAdd = event => {
		// add new ticket to db
    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/tickets/new', {
  title: values.title,
  description: values.description,
  created_by: user.id,
  column_id: currentColumn
})
			.then(res => {
  console.log('created new ticket', res.data)
  const newTicket = { ...res.data }
  setTickets([...tickets, newTicket])
  setDialogOpen(false)
})
			.catch(function (error) {
  console.log(error.message)
  setValues({ ...values, message: 'Form invalid' })
})
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    height: 'fit-content',
    backgroundColor: 'primary.main',
    boxShadow: 24
  }

  return (
    <Modal
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      aria-labelledby='modal-login-form'
      aria-describedby='modal-modal-login-form'
		>
      <Paper sx={style}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            color: 'background.default',
            m: 2
          }}
				>
          <Typography variant='h4' align='center'>
            <AddBox color='secondary' fontSize='large' />
          </Typography>
          <Typography variant='h4' align='center'>
						Create A New Ticket
					</Typography>
        </Box>

        <Divider />

        <Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ m: 2 }}
              label='Ticket Title'
              value={values.title}
              type='text'
              onChange={handleChange('title')}
              helperText={values.title === '' && 'Required field'}
              error={values.title === ''}
              required
						/>
            <TextField
              sx={{ m: 2 }}
              label='Ticket Details'
              value={values.description}
              type='text'
              onChange={handleChange('description')}
              helperText={values.description === '' && 'Required field'}
              error={values.description === ''}
              required
						/>
          </Box>
        </Box>

        <Divider />

        <Box
          sx={{
            display: 'flex',
            backgroundColor: 'primary.main',
            color: 'background.default',
            my: 3
          }}
				>
          <Button
            sx={{ mx: 2, width: '100%' }}
            color='success'
            size='large'
            variant='contained'
            onClick={onAdd}
					>
						Create Ticket
					</Button>
          <Button
            sx={{ mx: 2, width: '100%' }}
            color='secondary'
            size='large'
            variant='contained'
            onClick={() => setDialogOpen(false)}
					>
						Cancel
					</Button>
        </Box>
      </Paper>
    </Modal>
  )
}
