import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardItem from './DashboardItem'
import {
	NEW_PROJECT_FORM,
	CONFIRM_DELETE_PROJECT,
	PROJECT_VIEW
} from './constants/Modes'

export default function Dashboard (props) {
  const {
		mode,
		setMode,
		viewMode,
		setViewMode,
		user,
		currentProject,
		setCurrentProject,
		loadForm
	} = props

  const [projects, setProjects] = useState()
  const [dashboardProjects, setDashboardProjects] = useState()
  const stateRef = useRef()
  stateRef.current = dashboardProjects

  function purgeNullStates (states) {
    const results = []

    if (stateRef.current) {
      for (const state of states) {
        if (state !== null) {
          results.push(state)
        }
      }
    }

    return results
  }

  let index = 0

  function selectProject (index) {
    if (stateRef.current[index]) {
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
  setViewMode(PROJECT_VIEW)
})
    }
  }

  useEffect(() => {
    axios
			.get(process.env.REACT_APP_BACKEND_URL + `/projects/${user.id}`)
			.then(res => {
  setDashboardProjects(
					res.data.map(project_assignment => project_assignment.Project)
				)
  purgeNullStates(stateRef.current)
  setProjects(
					stateRef.current.map(project =>
  <DashboardItem
    key={project.id}
    value={project.name}
    listIndex={index++}
    currentProject={currentProject}
    dashItemProject={project}
    setCurrentProject={setCurrentProject}
    selectProject={selectProject}
    viewMode={viewMode}
    setViewMode={setViewMode}
    loadForm={loadForm}
						/>
					)
				)
  selectProject(0)
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
        <ListItemButton value='Create New Project'>
          <ListItemIcon />
          <ListItemText primary='Create New Project' />
        </ListItemButton>
      </List>
    </Box>
  )
}
