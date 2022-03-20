import * as React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import ProjectColumn from './ProjectColumn'

export default function ProjectView (props) {
  const { user, userProjects, currentProject } = props
  return (
    <TableContainer component={Paper}>
      <ProjectColumn user={user} userProjects={userProjects} />
    </TableContainer>
  )
}
