import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardItem from './DashboardItem'
import DeleteProjectForm from './Forms/DeleteProjectForm'
import NewProjectForm from './Forms/NewProjectForm'
import {
	NEW_PROJECT_FORM,
	DELETE_PROJECT_FORM,
	PROJECT_VIEW
} from './constants/Modes'
import { MANAGER_LEVEL } from './constants/AccessLevel'

export default function Dashboard (props) {
  const {
		mode,
		setMode,
		viewMode,
		setViewMode,
		user,
		currentProject,
		setCurrentProject,
		loadForm,
		open,
		setOpen,
		modals,
		openModals,
		closeModals
	} = props

  const [projects, setProjects] = useState()
  const [dashboardProjects, setDashboardProjects] = useState()
  console.log('######', dashboardProjects)
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
  const data = res.data.map(
					project_assignment => project_assignment.Project
				)

  setDashboardProjects(data)
  setProjects(data)
  selectProject(0)

				// const data = stateRef.current.map(project =>
				// 	<DashboardItem
				// 		key={project.id}
				// 		value={project.name}
				// 		listIndex={index++}
				// 		currentProject={currentProject}
				// 		dashItemProject={project}
				// 		setCurrentProject={setCurrentProject}
				// 		selectProject={selectProject}
				// 		viewMode={viewMode}
				// 		setViewMode={setViewMode}
				// 		loadForm={loadForm}
				// 		user={user}
				// 	/>
				// );
})
			.catch(err => {
  console.log(err)
})
  }, [])

  const generateDashbord = function () {
    const data = dashboardProjects.map(project =>
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
        modals={modals}
        openModals={openModals}
        closeModals={closeModals}
			/>
		)

    return data
  }

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
      {modals.deleteProjectForm &&
      <DeleteProjectForm
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        setViewMode={setViewMode}
        modals={modals}
        closeModals={closeModals}
        dashboardProjects={dashboardProjects}
        setDashboardProjects={setDashboardProjects}
				/>}
      {modals.newProjectForm &&
      <NewProjectForm
        user={user}
        setViewMode={setViewMode}
        modals={modals}
        closeModals={closeModals}
        setProjects={setProjects}
        dashboardProjects={dashboardProjects}
        setDashboardProjects={setDashboardProjects}
				/>}
      <List component='nav' aria-label='main mailbox folders'>
        {projects}
        {dashboardProjects !== undefined && generateDashbord()}
        {user.access_level == MANAGER_LEVEL &&
        <ListItemButton value='Create New Project'>
          <ListItemIcon />
          <ListItemText
            primary='Create New Project'
            onClick={() => openModals('newProjectForm')}
						/>
        </ListItemButton>}
      </List>
    </Box>
  )
}
{
	// dashboardProjects !== undefined && selectProject(0)
}
