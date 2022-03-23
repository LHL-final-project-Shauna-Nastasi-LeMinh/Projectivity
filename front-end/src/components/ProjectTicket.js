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
import RemoveTicket from './Forms/RemoveTicket'

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
		setCurrentTicket,
		tickets,
		setTickets
	} = props
  const [checked, setChecked] = React.useState([1])
  const [dialogOpen, setDialogOpen] = useState(false)

	// handle opening and closing of MoreVertIcon
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDialogOpening = evt => {
    if (evt.target.id === 'edit') {
      setOpen(EDIT_TICKET)
    }

    if (evt.target.id === 'details') {
      setOpen(SHOW_TICKET_DETAILS)
    }

    if (evt.target.id === 'remove') {
      setDialogOpen(REMOVE_TICKET)
    }

    closeMenu()
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
			>
        <ListItemText primary={title} />
        <div>
          <IconButton
            id='fade-button'
            aria-controls={openMenu ? 'fade-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClick}
					>
            <MoreVertIcon />
            {dialogOpen === REMOVE_TICKET &&
            <RemoveTicket
              tickets={tickets}
              setTickets={setTickets}
              ticketId={ticketId}
              setViewMode={setViewMode}
              dialogOpen={dialogOpen}
              setDialogOpen={setDialogOpen}
							/>}
          </IconButton>
          <Menu
            id='fade-menu'
            MenuListProps={{
              'aria-labelledby': 'fade-button'
            }}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={closeMenu}
            TransitionComponent={Fade}
					>
            <MenuItem id='details' onClick={evt => handleDialogOpening(evt)}>
							Details
						</MenuItem>
            <MenuItem id='edit' onClick={handleDialogOpening}>
							Edit
						</MenuItem>
            <MenuItem id='remove' onClick={evt => handleDialogOpening(evt)}>
							Remove
						</MenuItem>
          </Menu>
        </div>
      </ListItemButton>
    </ListItem>
  )
}
