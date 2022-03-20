import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import DashboardItem from './DashboardItem'

export default function Dashboard (props) {
  const { mode, setMode, user, setUser, userProjects, setUserProjects } = props

  const [projects, setProjects] = useState()

  let index = 0

	// /projects?id=1
  useEffect(() => {
    axios
			.get(process.env.REACT_APP_BACKEND_URL + `/projects/${user.id}`)
			.then(res => {
  setUserProjects(res.data)
  setProjects(
					res.data.map(project_assignment =>
  <DashboardItem
    value={project_assignment.Project.name}
    listIndex={index++}
						/>
					)
				)
})
  }, [])

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
        {projects}
        <DashboardItem value='CreateNewProject' listIndex={-1} />
      </List>
    </Box>
  )
}
