import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Box,
	Typography,
	Paper,
	Modal,
	IconButton
} from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';

export default function AssignTicket(props) {
	const {
		currentProject,
		setCurrentProject,
		ticketId,
		setAnchorPop,
		setTickets,
		tickets,
		user,
		title,
		employee,
		ticket,
		dialogOpen,
		setDialogOpen,
		columns,
		setColumns
	} = props;

	const [employees, setEmployees] = useState({
		all: []
	});

	const [value, setValue] = useState();

	console.log('ASSIGN TICKET VALUE', employee);

	const handleChange = (evt) => {
		setValue(evt.target.value);
	};

	// fetch current project assignees from db
	useEffect(() => {
		axios
			.get(
				process.env.REACT_APP_BACKEND_URL +
					`/projects/${currentProject.id}/assignees`
			)
			.then((res) => {
				if (res && res.data) {
					console.log('RESPONSE', res.data);
					setEmployees({ all: res.data });
				}
			})
			.catch(function (error) {
				console.log(error.message);
			});
	}, []);

	// mapped through employees to render menu item list
	const employeeList = employees.all.map((employee) => {
		let fullName = `${employee.first_name} ${employee.last_name}`;
		return (
			<MenuItem
				sx={{
					color: 'background.default',
					'&:hover': {
						backgroundColor: 'secondary.light'
					}
				}}
				key={employee.id}
				value={employee.id}
			>
				{fullName}
			</MenuItem>
		);
	});

	//update db owner-id field of a specific ticket
	const assignTicket = () => {
		axios
			.post(process.env.REACT_APP_BACKEND_URL + `/tickets/${ticketId}`, {
				id: ticketId,
				owner_id: value,
				title,
				updater_name: user.first_name + ' ' + user.last_name
			})
			.then((res) => {
				const updatedTicket = res.data[0];

				// const updatedTickets = tickets.filter(
				// 	(ticket) => ticket.id !== updatedTicket.id
				// );

				tickets.map((newTicket, index) => {
					if (newTicket.id === ticket.id) {
						tickets.splice(index, 1, updatedTicket);
					}
				});

				currentProject.Columns.map((currColumn) => {
					currColumn.Tickets.map((currTicket, index) => {
						if (currTicket.id === ticket.id) {
							currColumn.Tickets.splice(index, 1, updatedTicket);
						}
					});
				});

				// setTickets(tickets);
				setColumns(currentProject.Columns);
				setCurrentProject(currentProject);

				console.log('### FINAL', currentProject, columns, tickets);

				setDialogOpen(false);
			})
			.catch(function (error) {
				console.log(error.message);
			});
	};

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 420,
		height: 'fit-content',
		backgroundColor: 'primary.main',
		boxShadow: 24
	};

	return (
		<Modal
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
			aria-labelledby="modal-assign-title"
			aria-describedby="modal-assign-description"
		>
			<Paper sx={style}>
				<Box
					sx={{
						backgroundColor: 'primary.main',
						color: 'background.default',
						m: 2,
						display: 'inline-flex'
					}}
				>
					<Typography variant="p" sx={{ mr: 2 }}>
						<PersonAddIcon disableRipple fontSize="small" color="secondary" />
					</Typography>
					<Typography variant="p">Assign Ticket To An Employee</Typography>

					<IconButton
						disableRipple
						aria-label="close"
						onClick={() => setDialogOpen(false)}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: 'grey'
						}}
					>
						<CloseIcon />
					</IconButton>
				</Box>

				<Box
					sx={{
						width: '100%',
						backgroundColor: 'background.default',
						textAlign: 'center',
						display: 'inline-flex',
						py: 2
					}}
				>
					<FormControl sx={{ m: 1, minWidth: 300 }}>
						<InputLabel id="EmployeeLabel">Employees</InputLabel>
						<Select
							labelId="EmployeeLabel"
							label="Emloyee"
							id="Employee"
							value={value}
							defaultValue={employee.id ? employee.id : false}
							onChange={(evt) => handleChange(evt)}
						>
							<MenuItem
								sx={{
									color: 'background.default',
									'&:hover': {
										backgroundColor: 'secondary.light'
									}
								}}
								value="All"
							>
								<em>All Employees</em>
							</MenuItem>
							{employeeList}
						</Select>
					</FormControl>

					<Button
						sx={{ mx: 2, width: '10%' }}
						color="success"
						size="large"
						variant="contained"
						onClick={() => assignTicket()}
					>
						{' '}
						Assign
					</Button>
				</Box>
			</Paper>
		</Modal>
	);
}
