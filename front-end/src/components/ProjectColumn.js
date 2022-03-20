import React from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import ProjectTicket from './ProjectTicket'

export default function ProjectColumn (props) {
  return (
    <Table sx={{ width: '100%' }} aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell>To Do</TableCell>
          <TableCell>In Progress</TableCell>
          <TableCell>Completed</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <ProjectTicket />
      </TableBody>
    </Table>
  )
}
