import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ADDPROJECT } from './constants/Modes'
import axios from 'axios'
import { PROJECT_VIEW, DELETE_PROJECT_FORM } from './constants/Modes'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { MANAGER_LEVEL } from './constants/AccessLevel'

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
		loadForm,
		user
	} = props
  const [selectedIndex, setSelectedIndex] = React.useState()

  const handleListItemClick = (event, index, project_id) => {
    setSelectedIndex(index)
    selectProject(index)
    setViewMode(PROJECT_VIEW)
  }

  return (
    <ListItemButton
      selected={selectedIndex === listIndex}
      onClick={event => handleListItemClick(event, listIndex, dashItemProject)}
		>
      <ListItemIcon />
      <ListItemText
        key={key}
        primary={value}
        onClick={event =>
					handleListItemClick(event, listIndex, dashItemProject)}
			/>
      {user && user.access_level == MANAGER_LEVEL && <EditIcon />}
      {user &&
				user.access_level == MANAGER_LEVEL &&
				<DeleteIcon
  onClick={() => loadForm(dashItemProject, DELETE_PROJECT_FORM)}
				/>}
    </ListItemButton>
  )
}
