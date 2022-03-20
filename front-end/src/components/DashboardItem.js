import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

export default function DashboardItem (props) {
  const { value, listIndex } = props

  const [selectedIndex, setSelectedIndex] = React.useState()

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  return (
    <ListItemButton
      selected={selectedIndex === listIndex}
      onClick={event => handleListItemClick(event, listIndex)}
		>
      <ListItemIcon />
      <ListItemText primary={value} />
    </ListItemButton>
  )
}
