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
import ShowTicketDetails from './Forms/ShowTicketDetails'

import {
	SHOW_TICKET_DETAILS,
	EDIT_TICKET,
	REMOVE_TICKET
} from './constants/Modes'

export default function ProjectTicket (props) {
  const {
		state,
		title,
		// value,
		ticketId,
		setCurrentTicket,
		// tickets,
		// setTickets,
		isDragging
	} = props
  const [checked, setChecked] = React.useState([1])
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
  const [menuDialogOpen, setMenuDialogOpen] = useState(false)
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false)

	// handle opening and closing of MoreVertIcon
  const [anchorEl, setAnchorEl] = useState(null)
	// const open = Boolean(anchorEl)
	// const handleClick = event => {
	//   setAnchorEl(event.currentTarget)
	// }
	// const handleClose = () => {
	//   setAnchorEl(null)
	// }

	// const handleDialogOpening = evt => {
	//   if (evt.target.id === 'edit') {
	//     setEditDialogOpen(true)
	//   }

	//   if (evt.target.id === 'details') {
	//     setDetailsDialogOpen(true)
	//   }

	//   if (evt.target.id === 'remove') {
	//     setRemoveDialogOpen(true)
	//   }

	//   setEditDialogOpen(false)
	//   setDetailsDialogOpen(false)
	//   setRemoveDialogOpen(false)
	// }

	// const handleToggle = value => () => {
	//   const currentIndex = checked.indexOf(value)
	//   const newChecked = [...checked]

	//   if (currentIndex === -1) {
	//     newChecked.push(value)
	//   } else {
	//     newChecked.splice(currentIndex, 1)
	//   }

	//   setChecked(newChecked)
	// }

	// setChecked(newChecked)
	// }

  const clickHandler = function () {
    console.log(ticketId)
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
          backgroundColor: isDragging ? 'lightgreen' : 'white',
          transition: 'background-color 1s ease'
        }}
			>
        <ListItemText primary={state.currentTickets.title} />
        <div>
          <IconButton
            id='fade-button'
            aria-controls={ticketDialogOpen ? 'fade-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={ticketDialogOpen ? 'true' : undefined}
            onClick={() => setTicketDialogOpen(true)}
					>
            <MoreVertIcon />
          </IconButton>

          {detailsDialogOpen &&
          <ShowTicketDetails
							// tickets={tickets}
							// setTickets={setTickets}
            ticketId={ticketId}
							// setViewMode={setViewMode}
            dialogOpen={detailsDialogOpen}
            setDialogOpen={setDetailsDialogOpen}
						/>}
          {removeDialogOpen &&
          <RemoveTicket
							// tickets={tickets}
            ticketId={ticketId}
            dialogOpen={removeDialogOpen}
            setDialogOpen={setRemoveDialogOpen}
						/>}
          <Menu
            id='fade-menu'
            MenuListProps={{
              'aria-labelledby': 'fade-button'
            }}
            anchorEl={anchorEl}
						// open={openMenu}
            onClose={() => setTicketDialogOpen(false)}
            TransitionComponent={Fade}
					>
            <MenuItem id='details' onClick={() => setDetailsDialogOpen(true)}>
							Details
						</MenuItem>
            <MenuItem id='edit' onClick={() => setEditDialogOpen(true)}>
							Edit
						</MenuItem>
            <MenuItem id='remove' onClick={() => setRemoveDialogOpen(true)}>
							Remove
						</MenuItem>
          </Menu>
        </div>
      </ListItemButton>
    </ListItem>
  )
}

{
	/* <IconButton
            id='fade-button'
            aria-controls={ticketDialogOpen === true ? 'fade-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={ticketDialogOpen === true ? 'true' : undefined}
            onClick={() => {
              ticketDialogOpen
								? setTicketDialogOpen(false)
								: setTicketDialogOpen(true)
            }}
					>
            <MoreVertIcon />
          </IconButton>

          {detailsDialogOpen &&
          <ShowTicketDetails
							// tickets={tickets}
							// setTickets={setTickets}
            state={state}
            ticketId={ticketId}
            dialogOpen={detailsDialogOpen}
            setDialogOpen={setDetailsDialogOpen}
						/>}
          {removeDialogOpen &&
          <RemoveTicket
							// tickets={tickets}
            state={state}
            ticketId={ticketId}
            dialogOpen={removeDialogOpen}
            setDialogOpen={setRemoveDialogOpen}
						/>}
          <Menu
            id='fade-menu'
            MenuListProps={{
              'aria-labelledby': 'fade-button'
            }}
            anchorEl={anchorEl}
            open={menuDialogOpen}
            onClose={() => setMenuDialogOpen(false)}
            TransitionComponent={Fade}
					>
            <MenuItem id='details' onClick={() => setDetailsDialogOpen(true)}>
							Details
						</MenuItem>
            <MenuItem id='edit' onClick={() => setEditDialogOpen(true)}>
							Edit
						</MenuItem>
            <MenuItem id='remove' onClick={() => setRemoveDialogOpen(true)}>
							Remove
						</MenuItem>
          </Menu>
        </div> */
}
