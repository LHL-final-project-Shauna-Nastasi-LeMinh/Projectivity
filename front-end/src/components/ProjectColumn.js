import React, { useEffect } from 'react'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import ProjectTicket from './ProjectTicket'

export default function ProjectColumn (props) {
  const { user, userProjects } = props

  console.log('projects', userProjects)

  useEffect(() => {
    axios
			.get(process.env.REACT_APP_BACKEND_URL + `/tickets/${user.id}`)
			.then(res => {
  console.log('data:', res.data)
})
  }, [])

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
