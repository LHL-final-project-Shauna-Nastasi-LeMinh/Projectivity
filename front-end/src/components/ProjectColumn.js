import React, { useEffect, useState, forwardRef, useRef } from 'react';
import axios from 'axios';
import ProjectTicket from './ProjectTicket';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ADD_TICKET } from './constants/Modes';
import NewTicketForm from './Forms/NewTicketForm';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Slide from '@mui/material/Slide';
import { MANAGER_LEVEL } from './constants/AccessLevel';
import NewColumnForm from './Forms/NewColumnForm';
import EditColumnForm from './Forms/EditColumnForm';
import DeleteColumnForm from './Forms/DeleteColumnForm';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProjectColumn(props) {
	const {
		user,
		column,
		setViewMode,
		currentColumn,
		setCurrentColumn,
		colIndex,
		open,
		setOpen,
		deleteColumnFromProjectView,
		changeColumnFromProjectView,
		createNewColumn,
		currentTicket,
		setCurrentTicket,
		modals,
		openModals,
		closeModals,
		selectedColumn,
		setSelectedColumn,
		currentProject,
		userData,
		setUserData
	} = props;

	const [tickets, setTickets] = useState([]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [dialogContent, setDialogContent] = useState({});
	const [newColumnName, setNewColumnName] = useState('');
	const [editTicket, setEditTicket] = useState(false);

	// handle opening and closing of MoreHorizIcon
	const [anchorEl, setAnchorEl] = useState(null);
	const openIconMenu = Boolean(anchorEl);

	const menuIconClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const closeIconMenu = () => {
		setAnchorEl(null);
	};

	const openDeleteDialog = () => {
		closeIconMenu();
		const content = {};
		content.title = `Delete column "${column.name}"?`;
		content.text = '';

		if (tickets && tickets.length > 0) {
			content.text = `You still have tickets in this column. 
        Column deletion will permanently delete all associated tickets.`;
		}
		content.confirmLabel = 'Delete';
		setDialogContent(content);
		setDialogOpen(true);
	};

	const handleColumnActions = () => {
		closeDialog();
		if (dialogContent.confirmLabel === 'Delete') {
			deleteColumnFromProjectView(column.id);
		}
		if (dialogContent.confirmLabel === 'Change') {
			if (newColumnName === '') return;
			changeColumnFromProjectView(column.id, newColumnName);
		}
	};

	const openNewColumnNameDialog = () => {
		closeIconMenu();
		const content = {};
		content.title = `New name for column "${column.name}"?`;
		content.text = '';
		content.confirmLabel = 'Change';
		setDialogContent(content);
		setDialogOpen(true);
	};

	const closeDialog = () => {
		setDialogOpen(false);
	};

	useEffect(() => {
		setTickets(column.Tickets);
	}, [column]);

	const createNewTicket = () => {
		console.log('clicked create new ticket');
		setCurrentColumn(column.id);
		setEditTicket(false);
		setDialogOpen(ADD_TICKET);
		console.log('ticket', dialogOpen);
	};

	const setTextValue = function (event) {
		setNewColumnName(event.target.value);
	};

	return (
		<Draggable
			draggableId={column.name}
			index={colIndex}
			isDragDisabled={user.access_level != MANAGER_LEVEL}
			onClick={() => setCurrentColumn(column)}
		>
			{(provided) => (
				<Box
					sx={{ width: '20rem', mx: '1rem', backgroundColor: 'white' }}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					{modals.newColumnForm && (
						<NewColumnForm
							closeModals={closeModals}
							modals={modals}
							createNewColumn={createNewColumn}
						/>
					)}
					{modals.deleteColumnForm && (
						<DeleteColumnForm
							deleteColumn={deleteColumnFromProjectView}
							modals={modals}
							closeModals={closeModals}
							selectedColumn={selectedColumn}
						/>
					)}
					{modals.editColumnForm && (
						<EditColumnForm
							editColumn={changeColumnFromProjectView}
							modals={modals}
							closeModals={closeModals}
							selectedColumn={selectedColumn}
						/>
					)}
					<ListItem
						sx={{ padding: '0.1rem' }}
						onClick={() => {
							setSelectedColumn(column);
						}}
					>
						<ListItemButton>
							<ListItemText primary={column.name} />
							{user.access_level == MANAGER_LEVEL && (
								<IconButton
									id="fade-button"
									aria-controls={openIconMenu ? 'fade-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={openIconMenu ? 'true' : undefined}
									onClick={menuIconClick}
								>
									<MoreHorizIcon />
								</IconButton>
							)}
							<Menu
								id="fade-menu"
								MenuListProps={{
									'aria-labelledby': 'fade-button'
								}}
								anchorEl={anchorEl}
								open={openIconMenu}
								onClose={closeIconMenu}
								TransitionComponent={Fade}
							>
								<MenuItem
									onClick={() => {
										openModals('editColumnForm');
										closeIconMenu();
									}}
								>
									Change Name
								</MenuItem>
								<MenuItem
									onClick={() => {
										openModals('deleteColumnForm');
										closeIconMenu();
									}}
								>
									Delete
								</MenuItem>
							</Menu>
						</ListItemButton>
					</ListItem>

					<Dialog
						open={dialogOpen}
						TransitionComponent={Transition}
						keepMounted
						onClose={closeDialog}
						aria-describedby="alert-dialog-slide-description"
					>
						<DialogTitle>{dialogContent.title}</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-slide-description">
								{dialogContent.text}
							</DialogContentText>
							{dialogContent.confirmLabel === 'Change' && (
								<TextField
									autoFocus
									margin="dense"
									id="name"
									label="New Column Name"
									fullWidth
									variant="outlined"
									onChange={setTextValue}
								/>
							)}
						</DialogContent>
						<DialogActions>
							<Button onClick={handleColumnActions}>
								{dialogContent.confirmLabel}
							</Button>
							<Button onClick={closeDialog}>Cancel</Button>
						</DialogActions>
					</Dialog>
					<Divider />

					<Droppable droppableId={column.name} type="ticket">
						{(provided, snapshot) => (
							<List
								{...provided.droppableProps}
								ref={provided.innerRef}
								isdraggingover={snapshot.isDraggingOver}
								sx={{
									backgroundColor: snapshot.isDraggingOver
										? 'skyblue'
										: 'inherit',
									transition: 'background-color 1s ease'
								}}
							>
								<ColumnTickets
									tickets={tickets}
									setViewMode={setViewMode}
									setOpen={setOpen}
									currentTicket={currentTicket}
									open={open}
									setCurrentTicket={setCurrentTicket}
									setTickets={setTickets}
									user={user}
									currentColumn={currentColumn}
									currentProject={currentProject}
									userData={userData}
									setUserData={setUserData}
									editTicket={editTicket}
									setEditTicket={setEditTicket}
								/>
								{provided.placeholder}
							</List>
						)}
					</Droppable>
					<ListItem sx={{ padding: '0.1rem' }}>
						<ListItemButton>
							<ListItemText
								primary="Create New Ticket"
								onClick={() => createNewTicket()}
							/>
						</ListItemButton>
					</ListItem>
					{/* move opening of create new ticket from landing page */}
					{dialogOpen === ADD_TICKET && (
						<NewTicketForm
							user={user}
							currentColumn={currentColumn}
							tickets={tickets}
							setTickets={setTickets}
							dialogOpen={dialogOpen}
							setDialogOpen={setDialogOpen}
							title="Create A New Ticket"
							onsubmitMsg="Create Ticket"
							currentProject={currentProject}
							userData={userData}
							setUserData={setUserData}
							editTicket={editTicket}
						/>
					)}
				</Box>
			)}
		</Draggable>
	);
}

const ColumnTickets = React.memo(function ColumnTickets(props) {
	const {
		tickets,
		setViewMode,
		setOpen,
		currentTicket,
		setCurrentTicket,
		setTickets,
		open,
		user,
		currentColumn,
		currentProject,
		userData,
		setUserData,
		editTicket,
		setEditTicket
	} = props;
	return tickets.map((ticket, index) => {
		return (
			<Draggable
				key={'' + ticket.id}
				draggableId={'ticket_' + ticket.id}
				index={index}
			>
				{(provided, snapshot) => (
					<div
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						<ProjectTicket
							title={ticket.title}
							ticketId={ticket.id}
							isDragging={snapshot.isDragging}
							setViewMode={setViewMode}
							open={open}
							setOpen={setOpen}
							currentTicket={currentTicket}
							setCurrentTicket={setCurrentTicket}
							tickets={tickets}
							setTickets={setTickets}
							user={user}
							currentColumn={currentColumn}
							editTicket={editTicket}
							setEditTicket={setEditTicket}
							currentProject={currentProject}
							userData={userData}
						/>
					</div>
				)}
			</Draggable>
		);
	});
});
