import * as React from 'react'
import { useEffect, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import ProjectColumn from './ProjectColumn'
import Box from '@mui/material/Box'
import NewProjectForm from './NewProjectForm'
import { ADDPROJECT } from './constants/Modes'

export default function ProjectView (props) {
  const { user, currentProject, mode,
  setViewMode, setCurrentColumn} = props
  const [columns, setColumns] = useState([])

  useEffect(
		() => {
  if (currentProject) {
    setColumns(currentProject.Columns)
  }
},
		[currentProject]
	)

  const generatedColumns = columns.map(column =>
    <ProjectColumn
      key={column.id}
      user={user}
      title={column.name}
      column={column}
      setViewMode={setViewMode}
      setCurrentColumn={setCurrentColumn}
		/>
	)

  return (
    <Box sx={{ display: 'flex' }}>
      {generatedColumns}
    </Box>
  )
}
