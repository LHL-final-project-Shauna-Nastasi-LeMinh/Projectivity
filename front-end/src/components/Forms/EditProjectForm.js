import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Button,
	Modal,
	Typography,
	Box,
	TextField,
	Divider,
	Paper
} from '@mui/material';
import { AddBox } from '@mui/icons-material';
import { PROJECT_VIEW } from '../constants/Modes';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

export default function RegistrationForm(props) {
	const {
		setViewMode,
		user,
		modals,
		openModals,
		closeModals,
		dashboardProjects,
		setDashboardProjects,
		setProjects,
		currentProject,
		setCurrentProject,
		columns,
		editColumn,
		column,
		userData,
		allEmployees,
		modalProject
	} = props;
	const [values, setValues] = useState({
		message: '',
		name: (modalProject && modalProject.name) ? modalProject.name : undefined
	});
	const [assignees, setAssignees] = useState([]);

	useEffect(() => {
		axios
			.get(
				process.env.REACT_APP_BACKEND_URL +
					`/projects/${currentProject.id}/assignees`
			)
			.then((res) => {
				if (res && res.data) {
					const assgineeArray = [];
					res.data.forEach((assignee) => {
						assgineeArray.push(assignee.first_name + ' ' + assignee.last_name);
					});
					setAssignees(assgineeArray);
				}
			});
	}, []);

	const handleChange = (prop) => (event) => {
		setValues({
			...values,
			[prop]: event.target.value
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

	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250
			}
		}
	};

	const handleSelectChange = (event) => {
		const {
			target: { value }
		} = event;
		setAssignees(typeof value === 'string' ? value.split(',') : value);
	};

	function buildEmployeeList() {
		const mappedEmployees = {};
		allEmployees.forEach((employee) => {
			const fullname = employee.first_name + ' ' + employee.last_name;
			mappedEmployees[fullname] = employee.id;
		});
		return mappedEmployees;
	}

	function updateProjectDetails() {
		console.log("values.name: "+ values.name);
		if (typeof values.name === 'undefined' || values.name === '') {
			console.log("COME HEE")
			setValues((prev) => {
				return { ...prev, name: '' };
			});
			return;
		}

		modalProject.name = values.name;
		closeModals('editProjectForm');

		//assign employee to the project
		const mappedEmployees = buildEmployeeList();
		const assigneeIds = assignees.map((fullname) => mappedEmployees[fullname]);
		const params = {
			assigneeIds,
			name: values.name,
			description: values.description,
			employee_id: user.id
		};
		axios
			.post(
				process.env.REACT_APP_BACKEND_URL +
					`/projects/${currentProject.id}/details`,
				JSON.stringify(params),
				{
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			.then((res) => {
				console.log(res.data);
			})
			.catch(function (error) {
				console.log(error.message);
				setValues({ ...values, message: 'Form invalid' });
			});
	}

	return (
		<Modal
			open={modals.editProjectForm}
			onClose={() => closeModals('editProjectForm')}
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
						Edit A Project
						<AddBox color="secondary" fontSize="large" />
					</Typography>
				</Box>
				<Divider />
				<Box
					sx={{
						display: 'flex',
						width: '100%',
						backgroundColor: 'background.default'
					}}
				>
					<TextField
						sx={{
							width: '100%',
							m: 2
						}}
						label="New Project Name"
						value={values.name}
						// defaultValue={}
						type="text"
						onChange={handleChange('name')}
						helperText={values.name === '' && 'Required field'}
						error={values.name === ''}
						required
					/>
				</Box>
				<Divider />
				<Box sx={{ width: '100%', backgroundColor: 'background.default' }}>
					<FormControl sx={{ m: 2, width: '90%' }}>
						<InputLabel id="demo-multiple-checkbox-label">Employees</InputLabel>
						<Select
							sx={{ color: 'primary.main' }}
							labelId="demo-multiple-checkbox-label"
							id="demo-multiple-checkbox"
							multiple
							value={assignees}
							onChange={handleSelectChange}
							input={<OutlinedInput label="Employees" />}
							renderValue={(selected) => selected.join(', ')}
						>
							{allEmployees.map((employee) => (
								<MenuItem
									sx={{
										color: 'background.default',
										'&:hover': {
											backgroundColor: 'secondary.light'
										}
									}}
									key={employee.id}
									value={employee.first_name + ' ' + employee.last_name}
								>
									<Checkbox
										checked={
											assignees.indexOf(
												employee.first_name + ' ' + employee.last_name
											) > -1
										}
										value={employee.id}
										color="secondary"
										sx={{
											color: 'secondary.main',
											'&:hover': {
												color: 'secondary.light'
											}
										}}
									/>
									<ListItemText
										primary={employee.first_name + ' ' + employee.last_name}
									/>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box
					sx={{
						display: 'flex',
						backgroundColor: 'primary.main',
						color: 'background.default',
						my: 3
					}}
				>
					<Button
						sx={{
							mx: 2,
							width: '100%'
						}}
						color="success"
						size="large"
						variant="contained"
						onClick={() => {
							updateProjectDetails();
						}}
					>
						Edit
					</Button>
					<Button
						sx={{
							mx: 2,
							width: '100%'
						}}
						color="secondary"
						size="large"
						variant="contained"
						onClick={() => closeModals('editProjectForm')}
					>
						Cancel
					</Button>
				</Box>
			</Paper>
		</Modal>
	);
}
