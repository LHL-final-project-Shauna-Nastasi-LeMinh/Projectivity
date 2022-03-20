import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import DashboardProject from './DashboardProject'

export default function Dashboard (props) {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: '4rem',
        width: '100%',
        maxWidth: 360,
        bgcolor: '#555555'
      }}
		>
      <List component='nav' aria-label='main mailbox folders'>
        <DashboardProject value='Project 1' />
        <DashboardProject value='Project 2' />
        <DashboardProject value='Project 3' />
      </List>
    </Box>
  )
}
