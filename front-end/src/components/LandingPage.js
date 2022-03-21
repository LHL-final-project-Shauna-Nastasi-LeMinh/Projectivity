import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import ProjectView from './ProjectView'
import Container from '@mui/material/Container'
import NewProjectForm from './NewProjectForm'
import NewTicketForm from './NewTicketForm'
import ConfirmDeleteForm from './ConfirmDeleteForm'
import {
	CONFIRM_DELETE_PROJECT,
	NEW_PROJECT_FORM,
	PROJECT_VIEW,
  NEW_TICKET_FORM
} from './constants/Modes'

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
    setCurrentColumn
	} = props

  const [viewMode, setViewMode] = useState(PROJECT_VIEW)
  const [data, setData] = useState()
  const [dashboard, setDashboard] = useState()

  function loadForm (newData, mode) {
    console.log(newData, mode)
    setData(newData)
    setViewMode(mode)
  }

  return (
    <Container>
      {viewMode === PROJECT_VIEW &&
      <Dashboard
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
				/>}
      <Container>
        {viewMode === NEW_PROJECT_FORM &&
        <NewProjectForm user={user} setViewMode={setViewMode} />}
        {viewMode === CONFIRM_DELETE_PROJECT &&
        <ConfirmDeleteForm
          data={data}
          currentProject={currentProject}
          setViewMode={setViewMode}
					/>}
        {viewMode === NEW_TICKET_FORM && <NewTicketForm  user={user} currentColumn={currentColumn} setViewMode={setViewMode}/>}
        {viewMode === PROJECT_VIEW &&
        <ProjectView
          user={user}
          userProjects={userProjects}
          currentProject={currentProject}
          setViewMode={setViewMode}
          setCurrentColumn={setCurrentColumn}
					/>}
      </Container>
    </Container>
  )
}
