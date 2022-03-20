import React from 'react'
import Dashboard from './Dashboard'
import ProjectView from './ProjectView'
import Container from '@mui/material/Container'

export default function DashboardProject (props) {
  return (
    <Container>
      <Dashboard />
      <Container>
        <ProjectView />
      </Container>
    </Container>
  )
}
