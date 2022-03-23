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
		setCurrentColumn,
		open,
		setOpen,
		viewMode,
		setViewMode
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
				/>}
      <Container>
        {open === NEW_PROJECT_FORM &&
        <NewProjectForm
          user={user}
          setViewMode={setViewMode}
          open={open}
          setOpen={setOpen}
					/>}
        {open === DELETE_PROJECT_FORM &&
        <DeleteProjectForm
          data={data}
          currentProject={currentProject}
          setViewMode={setViewMode}
          open={open}
          setOpen={setOpen}
					/>}
        {open === NEW_TICKET_FORM &&
        <NewTicketForm
          user={user}
          currentColumn={currentColumn}
          setViewMode={setViewMode}
          open={open}
          setOpen={setOpen}
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
					/>}
      </Container>
    </Container>
  )
}
