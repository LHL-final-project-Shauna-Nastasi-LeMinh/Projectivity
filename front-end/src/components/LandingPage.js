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
        open={open}
        setOpen={setOpen}
        modals={modals}
        openModals={openModals}
        closeModals={closeModals}
        refresh={refresh}
        setRefresh={setRefresh}
				/>}
      <Container>
        {modals.newProjectForm &&
        <NewProjectForm
          user={user}
          setViewMode={setViewMode}
          modals={modals}
          closeModals={closeModals}
          setRefresh={setRefresh}
					/>}

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
          setViewMode={setViewMode}
          setCurrentColumn={setCurrentColumn}
          open={open}
          setOpen={setOpen}
          currentTicket={currentTicket}
          setCurrentTicket={setCurrentTicket}
          currentColumn={currentColumn}
					/>}
      </Container>
    </Container>
  )
}
