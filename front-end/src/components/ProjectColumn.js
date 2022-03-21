import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProjectTicket from './ProjectTicket'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

export default function ProjectColumn (props) {
  const { user, column } = props
  const [tickets, setTickets] = useState([])

  useEffect(
		() => {
  setTickets(column.Tickets)
},
		[column]
	)

  let index = 0
  const generatedTickets = tickets.map(ticket =>
    <ProjectTicket title={ticket.description} key={ticket.id} />
	)

  return (
    <Box sx={{ width: '20rem', mx: '1rem' }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={column.name} />
          </ListItemButton>
        </ListItem>
        <Divider />
        {generatedTickets}
        <ProjectTicket title='Create a new ticket' key={-1} />
      </List>
    </Box>
  )
}
