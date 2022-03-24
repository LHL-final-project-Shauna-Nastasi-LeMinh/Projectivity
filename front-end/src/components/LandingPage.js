import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import ProjectView from './ProjectView'
import Container from '@mui/material/Container'
import RemoveTicket from './Forms/RemoveTicket'

export default function DashboardProject (props) {
  const {
		mode,
		setMode,
		user,
		setUser,
		userProjects,
		setUserProjects,
		currentProject,
		setCurrentProject,
		currentColumn,
		setCurrentColumn,
		open,
		setOpen,
		viewMode,
		setViewMode,
		currentTicket,
		setCurrentTicket,
		state
	} = props

  const [data, setData] = useState()
  const [dashboard, setDashboard] = useState()

  function loadForm (newData, mode) {
    setData(newData)
    setViewMode(mode)
  }

  const dataLoaded =
		state.currentProject !== null &&
		state.currentColumns !== null &&
		state.currentTickets !== null &&
		state.allUserProjects !== null &&
		state.allUserColumns !== null &&
		state.allUserProjects !== null

  console.log('landing page', dataLoaded)
  console.log('current modals state', state.modals)

  return (
    <Container>
      {state.modes.projectView &&
				dataLoaded &&
				<Dashboard
  state={state}
  mode={mode}
  setMode={setMode}
  viewMode={viewMode}
  setViewMode={setViewMode}
  user={user}
  setUser={setUser}
  userProjects={userProjects}
  setUserProjects={setUserProjects}
  currentProject={currentProject}
  setCurrentProject={setCurrentProject}
  data={data}
  loadForm={loadForm}
  open={open}
  setOpen={setOpen}
				/>}
      <Container>
        {state.modes.projectView &&
					dataLoaded &&
					<ProjectView
  state={state}
  user={user}
  userProjects={userProjects}
  currentProject={currentProject}
  setViewMode={setViewMode}
  setCurrentColumn={setCurrentColumn}
  open={open}
  setOpen={setOpen}
  currentTicket={currentTicket}
  setCurrentTicket={setCurrentTicket}
					/>}
      </Container>
    </Container>
  )
}
