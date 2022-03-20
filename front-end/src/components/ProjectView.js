import * as React from 'react'
import { useEffect, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import ProjectColumn from './ProjectColumn'
import Box from '@mui/material/Box'

export default function ProjectView (props) {
  const { user, currentProject } = props
  const [columnData, setColumnData] = useState([]);

  useEffect(() => {
    if (currentProject) { 
      setColumnData(currentProject.Columns);
    }
    console.log(columnData);
  }, [currentProject])

  const generatedColumns = columnData.map(column =>
    <ProjectColumn
      user={user}
      title={column.name}
      tickets={column.Tickets}
		/>
	)

  return (
    <Box>
      {generatedColumns}
    </Box>
  )
}
