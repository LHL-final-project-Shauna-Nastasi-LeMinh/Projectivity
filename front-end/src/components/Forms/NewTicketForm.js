import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
	Button,
	Modal,
	Typography,
	Box,
	TextField,
	Divider,
	Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material'
import { AddBox } from '@mui/icons-material'


export default function NewTicketForm (props) {
  const { user, currentColumn, dialogOpen, setDialogOpen, tickets, setTickets } = props

  // state to keep ticket details
  const [ticketDetails, setTicketDetails] = useState({
    severities: [],
    priorities: [],
    types: [],
    milestones: []
  });

 
 // fetch available tikets details from db such as tickets type/priority etc.
  useEffect (() =>
    Promise.all([
      axios.get(process.env.REACT_APP_BACKEND_URL + '/severities'),
      axios.get(process.env.REACT_APP_BACKEND_URL + '/priorities'),
      axios.get(process.env.REACT_APP_BACKEND_URL + '/types'),
      axios.get(process.env.REACT_APP_BACKEND_URL + '/milestones')
    ])
    .then((res) => {
      console.log("get details", res)
      setTicketDetails({ severities: res[0].data, priorities: res[1].data, types: res[2].data, milestones: res[3].data });
      
    })
      .catch(function (error) {
      console.log(error.message)
      }), 
      []
  )
 
      // map over each ticket detail to create a list for dropdown menu
    const severitiesMenu = ticketDetails.severities.map(severity => <MenuItem key={severity.id} value={severity.name}>{severity.name}</MenuItem>)
    const prioritiesMenu = ticketDetails.priorities.map(priority => <MenuItem key={priority.id} value={priority.name}>{priority.name}</MenuItem>)
    const typesMenu = ticketDetails.types.map(type => <MenuItem key={type.id} value={type.name}>{type.name}</MenuItem>)
    const milestonesMenu = ticketDetails.milestones.map(milestone => <MenuItem key={milestone.id} value={milestone.name}>{milestone.name}</MenuItem>)


  
  const [values, setValues] = useState({
    message: '',
    title: undefined,
    description: undefined,
    severity: '',
    priority: '',
    type: '',
    milestone: ''
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
        column_id: currentColumn,
        severity: values.severity,
        priority: values.priority,
        type: values.type,
        milestone: values.milestone
      })
			.then((res) => {
      
        console.log("created new ticket", res.data)
       
        const newTicket = { ...res.data}
        setTickets([...tickets, newTicket])
        setDialogOpen(false)
})
			.catch(function (error) {
  console.log(error.message)
  setValues({ ...values, message: 'Form invalid' })
})
  }
  console.log(values.priority)
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
          <Box>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="PriorityLabel">Priority</InputLabel>
              <Select
                labelId="PriorityLabel"
                label="Priority"
                id="Priority"
                value={values.priority}
                onChange={handleChange('priority')}
              >
                
                {prioritiesMenu}
              </Select>
            </FormControl>

            <Divider orientation="vertical" variant="middle" flexItem />

            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="SeverityLabel">Severity</InputLabel>
              <Select
                labelId="SeverityLabel"
                label="Severity"
                id="Severity"
                value={values.severity}
                onChange={handleChange('severity')}
              >
                
                {severitiesMenu}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="TypeLabel">Type</InputLabel>
              <Select
                labelId="TypeLabel"
                label="Type"
                id="Type"
                value={values.type}
                onChange={handleChange('type')}
              >
                <MenuItem value=""><em>&nbsp</em></MenuItem>
               {typesMenu}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="MilestoneLabel">Milestone</InputLabel>
              <Select
                labelId="MilestoneLabel"
                label="Milestone"
                id="Milestone"
                value={values.milestone}
                onChange={handleChange('milestone')}
              >
                
                {milestonesMenu}
              </Select>
            </FormControl>
            
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
