import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import ProjectView from './ProjectView'
import Container from '@mui/material/Container'
import NewProjectForm from './Forms/NewProjectForm'
import NewTicketForm from './Forms/NewTicketForm'
import DeleteProjectForm from './Forms/DeleteProjectForm'
import {
	DELETE_PROJECT_FORM,
	NEW_PROJECT_FORM,
	PROJECT_VIEW,
	ADD_TICKET,
	EDIT_TICKET,
	SHOW_TICKET_DETAILS,
	REMOVE_TICKET,
	NEW_TICKET_FORM
} from './constants/Modes'
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
		modals,
		openModals,
		closeModals,
		refresh,
		setRefresh
	} = props

  const [data, setData] = useState()
  const [dashboard, setDashboard] = useState()

  return (
    <Container>
      <Container>
        {modals.newTicketForm &&
        <NewTicketForm
          user={user}
          currentColumn={currentColumn}
          setViewMode={setViewMode}
          modals={modals}
          closeModals={closeModals}
          setRefresh={setRefresh}
					/>}
        {viewMode === PROJECT_VIEW &&
        <ProjectView
          user={user}
          userProjects={userProjects}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
          setViewMode={setViewMode}
          setCurrentColumn={setCurrentColumn}
          open={open}
          setOpen={setOpen}
          currentTicket={currentTicket}
          setCurrentTicket={setCurrentTicket}
          currentColumn={currentColumn}
          modals={modals}
          closeModals={closeModals}
          openModals={openModals}
					/>}
      </Container>
    </Container>
  )
}
