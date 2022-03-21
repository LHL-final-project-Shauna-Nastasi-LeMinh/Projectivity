import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ADDPROJECT } from './constants/Modes'
import axios from 'axios'
import { PROJECT_VIEW } from './constants/Modes'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

export default function DashboardItem (props) {
  const {
		key,
		queueDelete,
		viewMode,
		setViewMode,
		value,
		listIndex,
		selectProject
	} = props
  const [selectedIndex, setSelectedIndex] = React.useState()

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
    selectProject(index)
    setViewMode(PROJECT_VIEW)
  }

  return (
    <ListItemButton
      selected={selectedIndex === listIndex}
      onClick={event => handleListItemClick(event, listIndex)}
		>
      <ListItemIcon />
      <ListItemText primary={value} />
      <EditIcon />
      <DeleteIcon onClick={() => queueDelete(key)} />
    </ListItemButton>
  )
}
