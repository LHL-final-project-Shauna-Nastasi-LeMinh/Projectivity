import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

export default function ProjectTicket (props) {
  const { title, value, ticketId } = props
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

  const clickHandler = function() {
    console.log(ticketId); 
    if (!ticketId) {
      // CREATE NEW TICKET GOES HERE
    } else {
      // VIEW / UPDATE TICKET DETAILS GOES HERE
    }

  }

  return (
    <ListItem disablePadding >
      <ListItemButton sx={{ backgroundColor: props.isDragging ? 'lightgreen' : 'white'}} onClick={clickHandler}>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  )
}
