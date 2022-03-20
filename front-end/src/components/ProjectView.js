import * as React from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import ProjectColumn from './ProjectColumn'

export default function ProjectView () {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: '100%' }} aria-label='simple table'>
        <ProjectColumn />
      </Table>
    </TableContainer>
  )
}
