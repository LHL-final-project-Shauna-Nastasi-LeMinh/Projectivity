<<<<<<< HEAD
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
=======
import * as React from 'react';
import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Box, Chip } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Fade from '@mui/material/Fade';
import RemoveTicket from './Forms/RemoveTicket';
import ShowTicketDetails from './Forms/ShowTicketDetails';
import NewTicketForm from './Forms/NewTicketForm';
import TicketHistory from './Forms/TicketHistory';
import { Typography } from '@mui/material';
import { BlockRounded } from '@mui/icons-material';
import { palette } from '@mui/system';
>>>>>>> feature/notification-drawer

import {
	SHOW_TICKET_DETAILS,
	EDIT_TICKET,
<<<<<<< HEAD
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
=======
	REMOVE_TICKET,
	ADD_TICKET,
	TICKET_HISTORY
} from './constants/Modes';
import { MANAGER_LEVEL } from './constants/AccessLevel';
import { modalClasses } from '@mui/material';

export default function ProjectTicket(props) {
	const {
		title,
		value,
		ticketId,
		setViewMode,
		setOpen,
		tickets,
		setTickets,
		user,
		currentColumn,
		ticket,
		setCurrentColumn,
		currentProject,
		userData,
		setUserData,
		editTicket,
		setEditTicket
	} = props;

	const [checked, setChecked] = React.useState([1]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [currentTicket, setCurrentTicket] = useState();

	// handle opening and closing of MoreVertIcon
	const [anchorEl, setAnchorEl] = useState(null);
	const openMenu = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const closeMenu = () => {
		setAnchorEl(null);
	};

	const handleDialogOpening = (evt) => {
		console.log(evt.target.id);

		if (evt.target.id === 'edit') {
			// openModals('newTicketForm');
			setEditTicket(true);
			setDialogOpen(EDIT_TICKET);
			setCurrentTicket(ticketId);
		}

		if (evt.target.id === 'details') {
			setDialogOpen(SHOW_TICKET_DETAILS);
			console.log(dialogOpen);
		}

		if (evt.target.id === 'remove') {
			setDialogOpen(REMOVE_TICKET);
			console.log(dialogOpen);
		}

		if (evt.target.id === 'history') {
			setDialogOpen(TICKET_HISTORY);
			console.log(dialogOpen);
		}

		closeMenu();
	};

	//

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const choosePriorityColor = (priority) => {
		const color = {
			min: '#264653',
			low: '#2A9D8F',
			medium: '#ffba08',
			high: '#f3722c',
			max: '#f94144'
		};

		switch (priority) {
			case 'Urgent':
				return color.max;
				break;
			case 'Essential':
				return color.high;
				break;
			case 'Valuable':
				return color.medium;
				break;
			case 'Discretionary':
				return color.low;
				break;
			default:
				return color.min;
				break;
		}
	};

	return (
		<ListItem>
			{ticket.priority && (
				<Chip
					pl="2"
					label={ticket.priority}
					color="primary"
					style={{
						backgroundColor: choosePriorityColor(ticket.priority),
						fontWeight: '700'
					}}
					size="small"
				/>
			)}

			<Box
				sx={{
					px: '0',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<Typography sx={{ color: 'background.default' }}>{title}</Typography>
				{/* <ListItemText primary={title} sx={{ fontSize: 'small' }} /> */}

				<div style={{ display: 'inherit' }}>
					<IconButton sx={{ px: '0' }}>
						<PersonAddIcon sx={{ fontSize: 'small' }} />
					</IconButton>
					<IconButton
						id="fade-button"
						aria-controls={openMenu ? 'fade-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={openMenu ? 'true' : undefined}
						onClick={handleClick}
						sx={{ px: '0', ml: '1' }}
					>
						<MoreVertIcon />
					</IconButton>

					{dialogOpen === SHOW_TICKET_DETAILS && (
						<ShowTicketDetails
							tickets={tickets}
							setTickets={setTickets}
							ticketId={ticketId}
							setViewMode={setViewMode}
							dialogOpen={dialogOpen}
							setDialogOpen={setDialogOpen}
						/>
					)}
					{dialogOpen === REMOVE_TICKET && (
						<RemoveTicket
							tickets={tickets}
							setTickets={setTickets}
							ticketId={ticketId}
							dialogOpen={dialogOpen}
							setDialogOpen={setDialogOpen}
							currentProject={currentProject}
							userData={userData}
							setCurrentColumn={setCurrentColumn}
						/>
					)}

					{dialogOpen === EDIT_TICKET && (
						<NewTicketForm
							user={user}
							currentColumn={currentColumn}
							tickets={tickets}
							setTickets={setTickets}
							dialogOpen={dialogOpen}
							ticketId={ticketId}
							setDialogOpen={setDialogOpen}
							title="Edit Ticket"
							onsubmitMsg="Edit Ticket"
							currentTicket={currentTicket}
							currentProject={currentProject}
							userData={userData}
							setUserData={setUserData}
							editTicket={editTicket}
						/>
					)}

					{dialogOpen === TICKET_HISTORY && (
						<TicketHistory
							tickets={tickets}
							setTickets={setTickets}
							ticketId={ticketId}
							dialogOpen={dialogOpen}
							setDialogOpen={setDialogOpen}
						/>
					)}

					<Menu
						id="fade-menu"
						MenuListProps={{
							'aria-labelledby': 'fade-button'
						}}
						anchorEl={anchorEl}
						open={openMenu}
						onClose={closeMenu}
						TransitionComponent={Fade}
					>
						<MenuItem id="details" onClick={(evt) => handleDialogOpening(evt)}>
							Details
						</MenuItem>
						<MenuItem id="edit" onClick={handleDialogOpening}>
							Edit
						</MenuItem>
						{user.access_level == MANAGER_LEVEL && (
							<MenuItem id="remove" onClick={(evt) => handleDialogOpening(evt)}>
								Remove
							</MenuItem>
						)}
						<MenuItem id="history" onClick={handleDialogOpening}>
							History
						</MenuItem>
					</Menu>
				</div>
			</Box>
		</ListItem>
	);
>>>>>>> feature/notification-drawer
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
