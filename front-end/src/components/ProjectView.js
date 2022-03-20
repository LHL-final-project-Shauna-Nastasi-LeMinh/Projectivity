import * as React from 'react'
import { useEffect } from 'react'
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

  // let column_data = [];
  // useEffect(() => {
  //   if (currentProject) { 
  //     let columnObjects = currentProject.Columns;
  //     if (columnObjects) {
  //       column_data = columnObjects.map(column => column.name);
  //     }
  //   }
  // }, [currentProject])

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
