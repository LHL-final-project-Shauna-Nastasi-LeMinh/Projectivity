import React, { useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import DashboardItem from './DashboardItem'

export default function Dashboard (props) {
  const { mode, setMode, user, setUser, userProjects, setUserProjects } = props

	// /projects?id=1
  useEffect(() => {
    axios
			.get(process.env.REACT_APP_BACKEND_URL + `/projects/${user.id}`)
			.then(res => {
  console.log(res.data)
  setUserProjects(
					res.data.map(project_assignment =>
  <DashboardItem value={project_assignment.Project.name} />
					)
				)
  console.log(userProjects)
})
  }, [])

  console.log(userProjects)

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
        {userProjects}
        <DashboardItem value='CreateNewProject' />
      </List>
    </Box>
  )
}
