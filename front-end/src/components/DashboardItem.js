import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ADDPROJECT } from './constants/Modes'
import axios from 'axios'
import { PROJECT_VIEW, CONFIRM_DELETE_PROJECT } from './constants/Modes'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function DashboardItem (props) {
  const {
		key,
		project,
		currentProject,
		setCurrentProject,
		dashItemProject,
		viewMode,
		setViewMode,
		value,
		listIndex,
		selectProject,
		loadForm
	} = props
  const [selectedIndex, setSelectedIndex] = React.useState()

  const handleListItemClick = (event, index, project_id) => {
    setSelectedIndex(index)
    selectProject(index)
    setViewMode(PROJECT_VIEW)
  }

  return (
    <ListItemButton selected={selectedIndex === listIndex}>
      <ListItemIcon />
      <ListItemText
        key={key}
        primary={value}
        onClick={event =>
					handleListItemClick(event, listIndex, dashItemProject)}
			/>
      <EditIcon />
      <DeleteIcon
        onClick={() => loadForm(dashItemProject, CONFIRM_DELETE_PROJECT)}
			/>
    </ListItemButton>
  )
}
