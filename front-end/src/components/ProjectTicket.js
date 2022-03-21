import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

export default function ProjectTicket (props) {
  const { title, value } = props
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
    <ListItem >
      <ListItemButton sx={{ backgroundColor: props.isDragging ? 'lightgreen' : 'white'}}>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  )
}
