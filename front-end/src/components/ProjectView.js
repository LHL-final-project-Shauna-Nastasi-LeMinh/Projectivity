import * as React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import ProjectColumn from './ProjectColumn'
import Box from '@mui/material/Box'

export default function ProjectView (props) {
  const { user, userProjects } = props

  const column_data = [
		{ title: 'To Do' },
		{ title: 'In Progress' },
		{ title: 'Completed' }
  ]

  const generatedColumns = column_data.map(column =>
    <ProjectColumn
      user={user}
      userProjects={userProjects}
      title={column.title}
		/>
	)

  return (
    <Box>
      {generatedColumns}
    </Box>
  )
}
