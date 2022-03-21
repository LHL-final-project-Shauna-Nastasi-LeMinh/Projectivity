import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardItem from './DashboardItem'
import { NEW_PROJECT_FORM } from './constants/Modes'

export default function Dashboard (props) {
  const {
		mode,
		setMode,
		viewMode,
		setViewMode,
		user,
		currentProject,
		setCurrentProject
	} = props

  const [projects, setProjects] = useState()
  const [dashboardProjects, setDashboardProjects] = useState()
  const stateRef = useRef()
  stateRef.current = dashboardProjects

  let index = 0

  function selectProject (index) {
    axios
			.get(
				process.env.REACT_APP_BACKEND_URL +
					'/projects/' +
					stateRef.current[index].id +
					'/columns'
			)
			.then(res => {
  setCurrentProject(prev => {
    return { ...stateRef.current[index], Columns: res.data }
  })
})
  }

	// /projects?id=1
  useEffect(() => {
    axios
			.get(process.env.REACT_APP_BACKEND_URL + `/projects/${user.id}`)
			.then(res => {
  setDashboardProjects(
					res.data.map(project_assignment => project_assignment.Project)
				)

  setProjects(
					res.data.map(project_assignment =>
  <DashboardItem
    key={project_assignment.Project.id}
    value={project_assignment.Project.name}
    listIndex={index++}
    currentProject={currentProject}
    selectProject={selectProject}
    viewMode={viewMode}
    setViewMode={setViewMode}
						/>
					)
				)
})
  }, [])

  useEffect(() => {
    if (dashboardProjects) {
      selectProject(0)
    }
  }, [dashboardProjects])

  function newProject () {
    axios.put()
  }

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
        <ListItemButton
          value='Create New Project'
          onClick={() => setViewMode(NEW_PROJECT_FORM)}
				>
          <ListItemIcon />
          <ListItemText primary='Create New Project' />
        </ListItemButton>
      </List>
    </Box>
  )
}
