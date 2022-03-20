import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { ADDPROJECT } from './constants/Modes'

export default function DashboardItem (props) {
  const { value, listIndex, setMode } = props

  const [selectedIndex, setSelectedIndex] = React.useState()

  const handleListItemClick = (event, index) => {
    if (index === -1) {
      setMode(ADDPROJECT)
    } else {
      setSelectedIndex(index)
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
