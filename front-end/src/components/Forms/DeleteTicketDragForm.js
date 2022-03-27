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

export default function DeleteTicketDragForm (props) {
  const {
		modals,
		closeModals,
		deleteTicket,
    dragSource,
	} = props
  const [values, setValues] = useState({
    message: '',
    confirm: undefined
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
      open={modals.deleteTicketDragForm}
      onClose={() => closeModals('deleteTicketDragForm')}
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
						Delete A Column
						<AddBox color='secondary' fontSize='large' />
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <TextField
              sx={{ m: 2 }}
              label='Type DELETE to confirm'
              value={values.confirm}
              type='text'
              onChange={handleChange('confirm')}
              helperText={values.confirm === '' && 'Required field'}
              error={values.confirm === ''}
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
            sx={{
              mx: 2,
              width: '100%'
            }}
            color='error'
            size='large'
            variant='contained'
            onClick={() => {
              if (values.confirm === 'DELETE') {
                deleteTicket(dragSource)
              }
            }}
					>
						Delete
					</Button>
          <Button
            sx={{
              mx: 2,
              width: '100%'
            }}
            color='secondary'
            size='large'
            variant='contained'
            onClick={() => closeModals('deleteTicketDragForm')}
					>
						Cancel
					</Button>
        </Box>
      </Paper>
    </Modal>
  )
}
