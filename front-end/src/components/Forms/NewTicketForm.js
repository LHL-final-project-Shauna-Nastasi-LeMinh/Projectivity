import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Button,
	Modal,
	Typography,
	Box,
	TextField,
	Divider,
	Paper,
	MenuItem,
	FormControl,
	InputLabel,
	Select
} from '@mui/material';
import { AddBox } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

import { ADD_TICKET, EDIT_TICKET } from '../constants/Modes';
import ProjectColumn from '../ProjectColumn';

export default function NewTicketForm(props) {
	const {
		user,
		currentColumn,
		dialogOpen,
		setDialogOpen,
		tickets,
		setTickets,
		onsubmitMsg,
		title,
		currentTicket,
		modals,
		currentProject,
		userData,
		setUserData,
		editTicket,
		setColumns
	} = props;

	console.log(currentTicket);
	// state to keep ticket details
	const [ticketDetails, setTicketDetails] = useState({
		severities: [],
		priorities: [],
		types: [],
		milestones: []
	});

	let ticket = {};
	if (currentTicket !== undefined) {
		ticket = tickets.filter((t) => t.id === currentTicket)[0];
	}

	// console.log(ticket)
	// fetch available tikets details from db such as tickets type/priority etc.
	useEffect(
		() =>
			Promise.all([
				axios.get(process.env.REACT_APP_BACKEND_URL + '/severities'),
				axios.get(process.env.REACT_APP_BACKEND_URL + '/priorities'),
				axios.get(process.env.REACT_APP_BACKEND_URL + '/types'),
				axios.get(process.env.REACT_APP_BACKEND_URL + '/milestones')
			])
				.then((res) => {
					setTicketDetails({
						severities: res[0].data,
						priorities: res[1].data,
						types: res[2].data,
						milestones: res[3].data
					});
				})
				.catch(function (error) {
					console.log(error.message);
				}),
		[]
	);

	//   // map over each ticket detail to create a list for dropdown menu
	// // const severitiesMenu = ticketDetails.severities.map(severity => <MenuItem sx={{
	// 					color: 'background.default',
	// 					'&:hover': {
	// 						backgroundColor: 'secondary.light'
	// 					}
	// 				}} key={severity.id} value={severity.name}>{severity.name}</MenuItem>)
	// // const prioritiesMenu = ticketDetails.priorities.map(priority => <MenuItem sx={{
	// 					color: 'background.default',
	// 					'&:hover': {
	// 						backgroundColor: 'secondary.light'
	// 					}
	// 				}} key={priority.id} value={priority.name}>{priority.name}</MenuItem>)
	// // const typesMenu = ticketDetails.types.map(type => <MenuItem sx={{
	// 					color: 'background.default',
	// 					'&:hover': {
	// 						backgroundColor: 'secondary.light'
	// 					}
	// 				}} key={type.id} value={type.name}>{type.name}</MenuItem>)
	// // const milestonesMenu = ticketDetails.milestones.map(milestone => <MenuItem sx={{
	// 					color: 'background.default',
	// 					'&:hover': {
	// 						backgroundColor: 'secondary.light'
	// 					}
	// 				}} key={milestone.id} value={milestone.name}>{milestone.name}</MenuItem>)

	// map over each ticket detail to create a list for dropdown menu
	const severitiesMenu = ticketDetails.severities.map((severity) => (
		<MenuItem
			sx={{
				color: 'background.default',
				'&:hover': {
					backgroundColor: 'secondary.light'
				}
			}}
			key={severity.id}
			value={severity.name}
		>
			{severity.name}
		</MenuItem>
	));
	const prioritiesMenu = ticketDetails.priorities.map((priority) => (
		<MenuItem
			sx={{
				color: 'background.default',
				'&:hover': {
					backgroundColor: 'secondary.light'
				}
			}}
			key={priority.id}
			value={priority.name}
		>
			{priority.name}
		</MenuItem>
	));
	const typesMenu = ticketDetails.types.map((type) => (
		<MenuItem
			sx={{
				color: 'background.default',
				'&:hover': {
					backgroundColor: 'secondary.light'
				}
			}}
			key={type.id}
			value={type.name}
		>
			{type.name}
		</MenuItem>
	));
	const milestonesMenu = ticketDetails.milestones.map((milestone) => (
		<MenuItem
			sx={{
				color: 'background.default',
				'&:hover': {
					backgroundColor: 'secondary.light'
				}
			}}
			key={milestone.id}
			value={milestone.name}
		>
			{milestone.name}
		</MenuItem>
	));

	const [values, setValues] = useState({
		message: '',
		title: undefined,
		description: undefined,
		severity: undefined,
		priority: undefined,
		type: undefined,
		milestone: undefined
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const onAdd = (event) => {
		if (values.title === undefined) {
			setValues({ ...values, title: '' });
			return;
		}
		// add new ticket to db
		axios
			.post(process.env.REACT_APP_BACKEND_URL + '/tickets/new', {
				title: values.title,
				description: values.description,
				created_by: user.id,
				column_id: currentColumn,
				severity: values.severity,
				priority: values.priority,
				type: values.type,
				milestone: values.milestone,
				creator_name: user.first_name + ' ' + user.last_name
			})
			.then((res) => {
				console.log('created new ticket', res.data);

				const newTicket = { ...res.data };
				setTickets([...tickets, newTicket]);
				setDialogOpen(false);

				currentProject.Columns.map((column) => {
					if (column.id === currentColumn) {
						column.Tickets.push(newTicket);
					}
				});
				setColumns(currentProject.Columns);
			})
			.catch(function (error) {
				console.log(error.message);
				setValues({ ...values, message: 'Form invalid' });
			});
	};

	const onEdit = () => {
		// update ticket to db
		axios
			.post(process.env.REACT_APP_BACKEND_URL + `/tickets/${ticket.id}`, {
				id: ticket.id,
				title: values.title,
				description: values.description,
				severity: values.severity,
				priority: values.priority,
				type: values.type,
				milestone: values.milestone,
				updater_name: user.first_name + ' ' + user.last_name
			})
			.then((res) => {
				console.log('updated new ticket', res.data);

				const updatedTicket = res.data[0];
				console.log('Ticket', updatedTicket);
				// console.log("updated new ticket", updatedTicket)
				const updatedTickets = tickets.filter(
					(ticket) => ticket.id !== currentTicket
				);
				console.log('Tickets', updatedTickets);
				setTickets([...updatedTickets, updatedTicket]);
				console.log(tickets);
				setDialogOpen(false);

				currentProject.Columns.map((currColumn) => {
					currColumn.Tickets.map((currTicket, index) => {
						if (currTicket.id === ticket.id) {
							currColumn.Tickets.splice(index, 1, updatedTicket);
						}
					});
				});
			})
			.catch(function (error) {
				console.log(error.message);
				setValues({ ...values, message: 'Form invalid' });
			});
	};

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 'fit-content',
		height: 'fit-content',
		backgroundColor: 'primary.main',
		boxShadow: 24
	};

	return (
		<Modal
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
			aria-labelledby="modal-login-form"
			aria-describedby="modal-modal-login-form"
		>
			<Paper sx={style}>
				<Box
					sx={{
						backgroundColor: 'primary.main',
						color: 'background.default',
						m: 2
					}}
				>
					<Typography variant="h4" align="center">
						{!editTicket && <AddBox color="secondary" fontSize="large" />}
						{editTicket && <EditIcon color="secondary" fontSize="large" />}
					</Typography>
					<Typography variant="h4" align="center">
						{title}
					</Typography>
				</Box>

				<Divider />

				<Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
					<Box sx={{ display: 'flex' }}>
						<TextField
							sx={{ m: 2 }}
							label="Ticket Title"
							value={values.title}
							type="text"
							onChange={handleChange('title')}
							helperText={values.title === '' && 'Required field'}
							error={values.title === ''}
							required={!editTicket ? true : false}
							defaultValue={editTicket ? `${ticket.title}` : ''}
						/>
						<TextField
							sx={{ m: 2 }}
							label="Ticket Details"
							value={values.description}
							type="text"
							onChange={handleChange('description')}
							helperText={values.description === '' && 'Required field'}
							error={values.description === ''}
							defaultValue={editTicket ? `${ticket.description}` : ''}
							required={!editTicket ? true : ''}
						/>
					</Box>
					<Box>
						<FormControl sx={{ m: 1, minWidth: 150 }}>
							<InputLabel id="PriorityLabel">Priority</InputLabel>
							<Select
								labelId="PriorityLabel"
								label="Priority"
								id="Priority"
								value={values.priority}
								onChange={handleChange('priority')}
								defaultValue={editTicket ? `${ticket.priority}` : ''}
							>
								{prioritiesMenu}
							</Select>
						</FormControl>

						<Divider orientation="vertical" variant="middle" flexItem />

						<FormControl sx={{ m: 1, minWidth: 150 }}>
							<InputLabel id="SeverityLabel">Severity</InputLabel>
							<Select
								labelId="SeverityLabel"
								label="Severity"
								id="Severity"
								value={values.severity}
								onChange={handleChange('severity')}
								defaultValue={editTicket ? `${ticket.severity}` : ''}
							>
								{severitiesMenu}
							</Select>
						</FormControl>

						{/* <TextField
                sx={{ m: 2 }}
                id="outlined-select-severity"
                select
                label="Severity"
                value={values.severity}
                defaultValue={dialogOpen === EDIT_TICKET ? `${ticket.severity}` : ''}
                onChange={handleChange('severity')}
                
              >
                {severitiesMenu}
            </TextField> */}

						<FormControl sx={{ m: 1, minWidth: 150 }}>
							<InputLabel id="TypeLabel">Type</InputLabel>
							<Select
								labelId="TypeLabel"
								label="Type"
								id="Type"
								value={values.type}
								onChange={handleChange('type')}
								defaultValue={editTicket ? `${ticket.type}` : ''}
							>
								<MenuItem
									sx={{
										color: 'background.default',
										'&:hover': {
											backgroundColor: 'secondary.light'
										}
									}}
									value=""
								>
									<em></em>
								</MenuItem>
								{typesMenu}
							</Select>
						</FormControl>

						<FormControl sx={{ m: 1, minWidth: 150 }}>
							<InputLabel id="MilestoneLabel">Milestone</InputLabel>
							<Select
								labelId="MilestoneLabel"
								label="Milestone"
								id="Milestone"
								value={values.milestone}
								onChange={handleChange('milestone')}
								defaultValue={editTicket ? `${ticket.milestone}` : ''}
							>
								{milestonesMenu}
							</Select>
						</FormControl>
					</Box>
				</Box>

				<Divider />

				<Box
					sx={{
						display: 'flex',
						backgroundColor: 'primary.main',
						color: 'background.default',
						my: 3
					}}
				>
					<Button
						sx={{ mx: 2, width: '100%' }}
						color="success"
						size="large"
						variant="contained"
						onClick={() => (editTicket ? onEdit() : onAdd())}
					>
						{title === 'Edit Ticket' && 'Edit'}
						{title === 'Create A New Ticket' && 'Create'}
					</Button>
					<Button
						sx={{ mx: 2, width: '100%' }}
						color="secondary"
						size="large"
						variant="contained"
						onClick={() => setDialogOpen(false)}
					>
						Cancel
					</Button>
				</Box>
			</Paper>
		</Modal>
	);
}
