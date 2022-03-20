import React, { useEffect } from 'react'
import axios from 'axios'
import ProjectTicket from './ProjectTicket'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

export default function ProjectColumn (props) {
  const { user, userProjects, title } = props

  useEffect(() => {
    axios
			.get(process.env.REACT_APP_BACKEND_URL + `/tickets/${user.id}`)
			.then(res => {
  console.log('data:', res.data)
})
  }, [])

  const data = [
		{ description: "I can't login" },
		{ description: "I can't login" },
		{ description: "I can't login" },
		{ description: "I can't login" }
  ]

  let index = 0
  const generatedTickets = data.map(ticket =>
    <ProjectTicket title={ticket.description} />
	)

  return (
    <Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={title} />
          </ListItemButton>
        </ListItem>
        <Divider />
        {generatedTickets}
      </List>
    </Box>
  )
}
