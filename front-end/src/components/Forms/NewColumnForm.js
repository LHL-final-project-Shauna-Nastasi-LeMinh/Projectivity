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

export default function NewColumnForm (props) {
  const {
		setViewMode,
		user,
		modals,
		openModals,
		closeModals,
		dashboardProjects,
		setDashboardProjects,
		setProjects,
		currentProject,
		setCurrentProject,
		columns,
		createNewColumn
	} = props
  const [values, setValues] = useState({
    message: '',
    name: undefined
  })

  const handleChange = prop => event => {
    setValues({
      ...values,
      [prop]: event.target.value
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
      open={modals.newColumnForm}
      onClose={() => closeModals('newColumnForm')}
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
						Create A New Column
						<AddBox color='secondary' fontSize='large' />
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            p: 2,
            backgroundColor: 'background.default'
          }}
				>
          <TextField
            sx={{
              width: '100%',
              backgroundColor: 'background.default'
            }}
            label='New Column Name'
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
            sx={{
              mx: 2,
              width: '100%'
            }}
            color='success'
            size='large'
            variant='contained'
            onClick={() => {
              closeModals('newColumnForm')
              createNewColumn(values.name)
            }}
					>
						Create
					</Button>
          <Button
            sx={{
              mx: 2,
              width: '100%'
            }}
            color='secondary'
            size='large'
            variant='contained'
            onClick={() => closeModals('newColumnForm')}
					>
						Cancel
					</Button>
        </Box>
      </Paper>
    </Modal>
  )
}
