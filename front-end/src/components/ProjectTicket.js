import * as React from 'react';
import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Box, Chip, Typography, Popover, Avatar, Stack } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Fade from '@mui/material/Fade';
import RemoveTicket from './Forms/RemoveTicket';
import ShowTicketDetails from './Forms/ShowTicketDetails';
import NewTicketForm from './Forms/NewTicketForm';
import TicketHistory from './Forms/TicketHistory';
import AssignTicket from './Forms/AssignTicket';

import useEmployeesData from '../hooks/useEmployeesData';

import { BlockRounded } from '@mui/icons-material';
import { padding, palette, textAlign } from '@mui/system';

import {
	SHOW_TICKET_DETAILS,
	EDIT_TICKET,
	REMOVE_TICKET,
	ADD_TICKET,
	TICKET_HISTORY,
	ASSIGN_TICKET
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
		setEditTicket,
		setColumns
	} = props;

	const [checked, setChecked] = React.useState([1]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [currentTicket, setCurrentTicket] = useState();

	// handle opening and closing of MoreVertIcon
	const [anchorEl, setAnchorEl] = useState(null);
	const [anchorPop, setAnchorPop] = useState(null);
	const openPop = Boolean(anchorPop);
	const openMenu = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const closeMenu = () => {
		setAnchorEl(null);
	};

	// for popover
	const id = openPop ? 'simple-popover' : undefined;

	const openPopover = (event) => {
		setCurrentTicket(ticketId);
		setAnchorPop(event.currentTarget);
	};

	const closePopover = () => {
		setAnchorPop(false);
	};

	const handleDialogOpening = (evt) => {
		console.log(evt.target.id);
		console.log(evt.currentTarget);

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

	const handleTicketClick = () => {
		console.log('ticket was clicked');
		setDialogOpen(SHOW_TICKET_DETAILS);
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
			min: '#277da1',
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

	const employee = useEmployeesData(ticket.owner_id, tickets);

	const isAvatar = () => {
		return;
	};

	return (
		<ListItem sx={{ display: 'block' }}>
			<Stack direction="row" spacing={1}>
				{ticket.priority && (
					<Chip
						pl="2"
						label={ticket.priority}
						style={{
							backgroundColor: choosePriorityColor(ticket.priority),
							fontWeight: '700'
						}}
						size="small"
					/>
				)}

				{/* {!employee.avatar.length &&
					Object.keys(employee).length !== 0 &&
					ticket.owner_id && (
						<Avatar sx={{ width: 26, height: 26, borderRadius: 1 }}>
							{`${employee.first_name[0]}${employee.last_name[0]}`}
						</Avatar>
					)} */}

				{Object.keys(employee).length !== 0 && ticket.owner_id && (
					<Avatar
						sx={{
							width: 26,
							height: 26,
							borderRadius: 1,
							backgroundSize: 'cover',
							backgroundPosition: 'center'
						}}
						size={100}
						alt={`${employee.first_name[0]}${employee.last_name[0]}`}
						src={employee.avatar}
					>
						<img
							alt={`${employee.first_name[0]}${employee.last_name[0]}`}
							src={''}
						></img>
					</Avatar>
				)}
			</Stack>

			<Box
				sx={{
					px: '0',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<ListItemButton
					disableRipple
					sx={{
						ml: 0,
						pl: 0,
						'&:hover': {
							backgroundColor: 'transparent'
						}
					}}
					disableTouchRipple
					onClick={handleTicketClick}
				>
					<div>
						<Typography sx={{ color: 'background.default' }}>
							{title}
						</Typography>
						{/* <ListItemText primary={title} sx={{ fontSize: 'small' }} /> */}
					</div>
				</ListItemButton>

				<div style={{ display: 'inherit' }}>
					<IconButton
						disableRipple
						sx={{ px: '0' }}
						aria-describedby={id}
						variant="contained"
						onClick={() => setDialogOpen(ASSIGN_TICKET)}
					>
						<PersonAddIcon
							disableRipple
							sx={{
								fontSize: 'small',
								color: 'background.default',
								'&:hover': { color: 'primary.main' }
							}}
						/>
					</IconButton>

					<IconButton
						disableRipple
						id="fade-button"
						aria-controls={openMenu ? 'fade-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={openMenu ? 'true' : undefined}
						onClick={handleClick}
						sx={{ px: '0', ml: '1' }}
					>
						<MoreVertIcon
							disableRipple
							sx={{
								color: 'background.default',
								'&:hover': { color: 'primary.main' }
							}}
						/>

						{/* <div style={{ display: 'inherit' }}>
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
						<MoreVertIcon /> */}
					</IconButton>

					{dialogOpen === ASSIGN_TICKET && (
						<AssignTicket
							currentProject={currentProject}
							ticketId={ticketId}
							setAnchorPop={setAnchorPop}
							setTickets={setTickets}
							tickets={tickets}
							user={user}
							title={title}
							employee={employee}
							ticket={ticket}
							dialogOpen={dialogOpen}
							setDialogOpen={setDialogOpen}
						/>
					)}

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
							user={user}
							ticket={ticket}
							tickets={tickets}
							setTickets={setTickets}
							ticketId={ticketId}
							dialogOpen={dialogOpen}
							setDialogOpen={setDialogOpen}
							currentProject={currentProject}
							userData={userData}
							setCurrentColumn={setCurrentColumn}
							setColumns={setColumns}
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
						<MenuItem
							sx={{
								color: 'background.default',
								'&:hover': {
									backgroundColor: 'secondary.light'
								}
							}}
							id="details"
							onClick={(evt) => handleDialogOpening(evt)}
						>
							Details
						</MenuItem>
						<MenuItem
							sx={{
								color: 'background.default',
								'&:hover': {
									backgroundColor: 'secondary.light'
								}
							}}
							id="edit"
							onClick={handleDialogOpening}
						>
							Edit
						</MenuItem>
						{user.access_level == MANAGER_LEVEL && (
							<MenuItem
								sx={{
									color: 'background.default',
									'&:hover': {
										backgroundColor: 'secondary.light'
									}
								}}
								id="remove"
								onClick={(evt) => handleDialogOpening(evt)}
							>
								Remove
							</MenuItem>
						)}
						<MenuItem
							sx={{
								color: 'background.default',
								'&:hover': {
									backgroundColor: 'secondary.light'
								}
							}}
							id="history"
							onClick={handleDialogOpening}
						>
							History
						</MenuItem>
					</Menu>
				</div>
				{/* </ListItemButton> */}
			</Box>
		</ListItem>
	);
}
