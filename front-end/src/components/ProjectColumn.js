import React from 'react'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import ProjectTicket from './ProjectTicket'

export default function ProjectColumn (props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>To Do</TableCell>
        <TableCell>In Progress</TableCell>
        <TableCell>Completed</TableCell>
      </TableRow>
      <TableBody>
        <ProjectTicket />
      </TableBody>
    </TableHead>
  )
}
