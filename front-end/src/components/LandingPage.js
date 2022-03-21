import React, { useState } from 'react'
import Dashboard from './Dashboard'
import ProjectView from './ProjectView'
import Container from '@mui/material/Container'
import NewProjectForm from './NewProjectForm'
import ConfirmDeleteForm from './ConfirmDeleteForm'
import {
	CONFIRM_DELETE_PROJECT,
	NEW_PROJECT_FORM,
	PROJECT_VIEW
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
		setCurrentProject
	} = props

  const [viewMode, setViewMode] = useState()

  return (
    <Container>
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
			/>

      <Container>
        {viewMode === NEW_PROJECT_FORM &&
        <NewProjectForm user={user} setViewMode={setViewMode} />}
        {viewMode === CONFIRM_DELETE_PROJECT &&
        <ConfirmDeleteForm
          project={currentProject}
          setViewMode={setViewMode}
					/>}
        {/* {viewMode === NEW_TICKET_FORM && <NewTicketForm />} */}
        {viewMode === PROJECT_VIEW &&
        <ProjectView
          user={user}
          userProjects={userProjects}
          currentProject={currentProject}
					/>}
      </Container>
    </Container>
  )
}
