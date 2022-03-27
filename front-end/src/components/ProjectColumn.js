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
import Bin from './Bin';
import AddIcon from '@mui/icons-material/Add';

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
		setUserData,
		setColumns
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
					sx={{
						width: 'fit-content',
						minWidth: '16rem',
						mx: '1rem'
					}}
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
						sx={{
							padding: '0.1rem',
							transition: 'background-color 0.5s ease',
							'&:hover': {
								backgroundColor: 'secondary.light'
							}
						}}
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
						<Box
							sx={{
								height: 'fit-content',
								minHeight: '24rem',
								maxHeight: '36rem',
								backgroundColor: 'rgb(41, 50, 65, 0.1)',
								transition: 'background-color 0.5s ease',
								'&:hover': {
									backgroundColor: 'rgb(249, 65, 68, 0.1)'
								}
							}}
							{...provided.droppableProps}
							ref={provided.innerRef}
							isdraggingover={snapshot.isDraggingOver}
						>
							<List
								
								sx={{
									backgroundColor: snapshot.isDraggingOver
										? 'rgba(240, 240, 240, .7)'
										: 'inherit',
									transition: 'background-color 0.5s ease'
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
									setCurrentColumn={setCurrentColumn}
									currentProject={currentProject}
									userData={userData}
									setUserData={setUserData}
									editTicket={editTicket}
									setEditTicket={setEditTicket}
								/>
								
							</List>
							{provided.placeholder}
						</Box>
						)}
					</Droppable>
					<Divider />
					<Box
						sx={{
							color: 'primary.main',
							transition: 'background-color 0.5s ease',
							'&:hover': {
								backgroundColor: 'secondary.light'
							}
						}}
						onClick={() => createNewTicket()}
					>
						<ListItem>
							<ListItemButton>
								<ListItemText primary="Create New Ticket" fontSize="large" />
								<AddIcon fontSize="large" />
							</ListItemButton>
						</ListItem>
					</Box>
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
							setColumns={setColumns}
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
		setCurrentColumn,
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
					<Box
						sx={{
							display: 'block',
							marginBottom: 1,
							borderRadius: 4,
							borderColor: 'primary.light',
							transition: 'background-color 0.5s ease',
							'&:hover': {
								backgroundColor: 'secondary.light'
							},
							marginBottom: 1,
							backgroundColor: snapshot.isDragging
								? 'secondary.main'
								: 'primary.main'
						}}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
					>
						<ProjectTicket
							ticket={ticket}
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
							setCurrentColumn={setCurrentColumn}
							editTicket={editTicket}
							setEditTicket={setEditTicket}
							currentProject={currentProject}
							userData={userData}
						/>
					</Box>
				)}
			</Draggable>
		);
	});
});
