import * as React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import ProjectColumn from './ProjectColumn'
import Box from '@mui/material/Box'

export default function ProjectView (props) {
  const { user, userProjects, currentProject } = props

  const column_data = [
		{ title: 'To Do' },
		{ title: 'In Progress' },
		{ title: 'Completed' }
  ]
  // const columnObjects = currentProject.Columns;
  // let column_data = [];
  // if (columnObjects) {
  //   column_data = currentProject.Columns.map(column => { 
  //     return {title: column.name}
  //   })
  // }

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
