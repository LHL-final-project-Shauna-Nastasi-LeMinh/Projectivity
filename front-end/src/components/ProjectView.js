import * as React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import ProjectColumn from './ProjectColumn'

export default function ProjectView () {
  return (
    <TableContainer component={Paper}>
      <ProjectColumn />
    </TableContainer>
  )
}
