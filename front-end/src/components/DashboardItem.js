import React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

export default function DashboardItem (props) {
  const [selectedIndex, setSelectedIndex] = React.useState()

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  const { value } = props

  return (
    <ListItemButton
      selected={selectedIndex === 0}
      onClick={event => handleListItemClick(event, 0)}
		>
      <ListItemIcon />
      <ListItemText primary={value} />
    </ListItemButton>
  )
}
