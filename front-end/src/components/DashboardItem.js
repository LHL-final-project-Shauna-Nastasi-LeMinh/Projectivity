import React, { useEffect } from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ADDPROJECT } from './constants/Modes'
import axios from 'axios'

export default function DashboardItem (props) {
  const { value, listIndex, selectProject, setMode, mode } = props

  const [selectedIndex, setSelectedIndex] = React.useState()

  const handleListItemClick = (event, index) => {
    if (index === -1) {
      setMode(ADDPROJECT)
    } else {
      setSelectedIndex(index)
      selectProject(index);
    }
  
    
  }

  return (
    <ListItemButton
      selected={selectedIndex === listIndex}
      onClick={event => handleListItemClick(event, listIndex)}
		>
      <ListItemIcon />
      <ListItemText primary={value}/>
    </ListItemButton>
    
  )
}
