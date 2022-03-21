import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { NEW_TICKET_FORM } from './constants/Modes'

export default function ProjectTicket (props) {
  const { title, value, setViewMode } = props
  const [checked, setChecked] = React.useState([1])

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (

    <ListItem disablePadding >
      <ListItemButton >
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
    
  )
}
