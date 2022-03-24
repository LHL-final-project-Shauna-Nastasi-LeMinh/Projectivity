import React, { useState } from 'react'
import axios from 'axios'
import { AddBox } from '@mui/icons-material'
import {
	Button,
	Modal,
	Typography,
	Box,
	TextField,
	Divider,
	Paper
} from '@mui/material'

export default function RegistrationForm (props) {
  const { state } = props

  const createNewProject = event => {
    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/projects/new', {
  name: state.formData.name,
  description: state.formData.description,
  employee_id: state.currentUser.id
})
			.then(res => {
				// close newProjectForm modal
  state.openModal('newProjectForm')
})
			.catch(function (error) {
  console.log(error.message)
  state.setStateTarget('formData', {
    ...state.formData,
    message: 'Form invalid'
  })
				// state.setState({ ...state, [state.formData.message]: 'Form invalid' })
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
      open={state.modals.newProjectForm}
      onClose={state.closeModal('newProjectForm')}
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
              label='Project Title'
              value={state.formData.name}
              type='text'
              onChange={state.setFormData('name')}
              helperText={state.formData.name === '' && 'Required field'}
              error={state.formData.name === ''}
              required
						/>
            <TextField
              sx={{ m: 2 }}
              label='Ticket Details'
              value={state.formData.description}
              type='text'
              onChange={state.setFormData('description')}
              helperText={state.formData.description === '' && 'Required field'}
              error={state.formData.description === ''}
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
            onClick={createNewProject}
					>
						Create Ticket
					</Button>
          <Button
            sx={{ mx: 2, width: '100%' }}
            color='secondary'
            size='large'
            variant='contained'
            onClick={state.closeModal('newProjectForm')}
					>
						Cancel
					</Button>
        </Box>
      </Paper>
    </Modal>
  )
}
