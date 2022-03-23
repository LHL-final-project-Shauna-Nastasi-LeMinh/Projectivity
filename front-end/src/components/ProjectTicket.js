import * as React from 'react'
import { useState } from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Fade from '@mui/material/Fade'

import {
	SHOW_TICKET_DETAILS,
	EDIT_TICKET,
	REMOVE_TICKET
} from './constants/Modes'

export default function ProjectTicket (props) {
  const {
		title,
		value,
		ticketId,
		setViewMode,
		setOpen,
		setCurrentTicket
	} = props
  const [checked, setChecked] = React.useState([1])

	// handle opening and closing of MoreVertIcon
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

	//

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

  const clickHandler = function () {
    if (!ticketId) {
			// CREATE NEW TICKET GOES HERE
    } else {
			// VIEW / UPDATE TICKET DETAILS GOES HERE
    }
  }

  return (
    <ListItem sx={{ padding: '0.1rem' }}>
      <ListItemButton
        sx={{
          backgroundColor: props.isDragging ? 'lightgreen' : 'white',
          transition: 'background-color 1s ease'
        }}
        onClick={evt => handleClick(evt)}
			>
        <ListItemText primary={title} />
        <div>
          <IconButton
            id='fade-button'
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
					>
            <MoreVertIcon />
          </IconButton>
          <Menu
            id='fade-menu'
            MenuListProps={{
              'aria-labelledby': 'fade-button'
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
					>
            <MenuItem onClick={handleClose}>Details</MenuItem>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Remove</MenuItem>
          </Menu>
        </div>
      </ListItemButton>
    </ListItem>
  )
}
