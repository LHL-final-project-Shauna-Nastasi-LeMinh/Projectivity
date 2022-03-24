import React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardItem from './DashboardItem'

export default function Dashboard (props) {
  const { state } = props

  let index = 0

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: '4rem',
        width: '100%',
        maxWidth: 360
      }}
		>
      <List component='nav' aria-label='main mailbox folders'>
        {state.allUserProjects.map(project => {
          return (
            <DashboardItem
              key={index++}
              value={project.id}
              primary={project.name}
              state={state}
						/>
          )
        })}
        <ListItemButton key={index++} value='Create New Project'>
          <ListItemIcon />
          <ListItemText
            primary='Create New Project'
            onClick={() => state.openModal('newProjectForm')}
					/>
        </ListItemButton>
      </List>
    </Box>
  )
}
