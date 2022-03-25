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

export default function RegistrationForm (props) {
  const {
		user,
		setDashboardProjects,
		setProjects,
		columns,
		setColumns,
		modals,
		closeModals,
    allEmployees
	} = props
  const [values, setValues] = useState({
    message: '',
    name: undefined,
    description: undefined
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  function createNewProject () {
    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/projects/new', {
  name: values.name,
  description: values.description,
  employee_id: user.id
})
			.then(res => {
  axios
					.get(process.env.REACT_APP_BACKEND_URL + `/projects/${user.id}`)
					.then(res => {
  const data = res.data.map(
							project_assignment => project_assignment.Project
						)
  setDashboardProjects(data)
						// setProjects(data)
  closeModals('newProjectForm')
})
					.catch(err => {
  console.log(err)
})
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
      open={modals.newProjectForm}
      onClose={() => closeModals('newProjectForm')}
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
						Create A New Column
					</Typography>
        </Box>

        <Divider />

        <Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
          <TextField
            sx={{ m: 2, width: '100%' }}
            label='Project Title'
            value={values.name}
            type='text'
            onChange={handleChange('name')}
            helperText={values.name === '' && 'Required field'}
            error={values.name === ''}
            required
					/>
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
            sx={{ mx: 2, width: '50%' }}
            color='success'
            size='large'
            variant='contained'
            onClick={() => createNewProject()}
					>
						Create Ticket
					</Button>
          <Button
            sx={{ mx: 2, width: '50%' }}
            color='secondary'
            size='large'
            variant='contained'
            onClick={() => closeModals('newProjectForm')}
					>
						Cancel
					</Button>
        </Box>
      </Paper>
    </Modal>
  )
}
