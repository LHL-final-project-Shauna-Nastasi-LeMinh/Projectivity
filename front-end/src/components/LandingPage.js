import React, { useState } from 'react'
import Dashboard from './Dashboard'
import ProjectView from './ProjectView'
import Container from '@mui/material/Container'
import NewProjectForm from './Forms/NewProjectForm'
import NewTicketForm from './Forms/NewTicketForm'
import DeleteProjectForm from './Forms/DeleteProjectForm'
import RemoveTicket from './Forms/RemoveTicket'

export default function DashboardProject (props) {
  const { state } = props

	// function loadForm (newData, mode) {
	//   state.setFormData(newData)
	//   state.setMode(mode)
	// }

  return (
    <Container>
      {state.modals.editTicketForm && <Dashboard state={state} />}
      <Container>
        {state.modals.newProjectForm && <NewProjectForm state={state} />}
        {state.modals.deleteProjectForm && <DeleteProjectForm state={state} />}

        {state.modals.newTicketForm && <NewTicketForm state={state} />}
        {state.modals.deleteTicketForm && <RemoveTicket state={state} />}
        {state.modes.projectView && <ProjectView state={state} />}
      </Container>
    </Container>
  )
}
