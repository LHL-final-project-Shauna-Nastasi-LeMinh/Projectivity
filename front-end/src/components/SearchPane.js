import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import useDebounce from '../hooks/useDebounce';
import { MANAGER_LEVEL } from './constants/AccessLevel';

export default function SearchPane(props) {
	const { searchFilter, resetSearchPane, user } = props;

	const [severities, setSeverities] = useState([]);
	const [priorities, setPriorities] = useState([]);
	const [types, setTypes] = useState([]);
	const [milestones, setMilestones] = useState([]);

	const [criteria, setCriteria] = useState({
		ALL_TICKETS: true,
		DESC: '',
		SEVERITY: 'All',
		PRIORITY: 'All',
		TYPE: 'All',
		MILESTONE: 'All'
	});
	const [searchInput, setSearchInput] = useState();

	const delayedInput = useDebounce(searchInput, 500);

	const DESC = 'DESC';
	const SEVERITY = 'SEVERITY';
	const PRIORITY = 'PRIORITY';
	const TYPE = 'TYPE';
	const MILESTONE = 'MILESTONE';
	const ALL_TICKETS = 'ALL_TICKETS';

	useEffect(() => {
		criteria[DESC] = delayedInput;
		searchFilter({ ...criteria });
	}, [delayedInput, criteria]);

	useEffect(() => {
		setCriteria({
			ALL_TICKETS: true,
			DESC: '',
			SEVERITY: 'All',
			PRIORITY: 'All',
			TYPE: 'All',
			MILESTONE: 'All'
		});
		setSearchInput('');
	}, [resetSearchPane]);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + '/severities')
			.then((res) => {
				setSeverities(res.data);
			})
			.catch(function (error) {
				console.log(error.message);
			});

		axios
			.get(process.env.REACT_APP_BACKEND_URL + '/priorities')
			.then((res) => {
				setPriorities(res.data);
			})
			.catch(function (error) {
				console.log(error.message);
			});

		axios
			.get(process.env.REACT_APP_BACKEND_URL + '/types')
			.then((res) => {
				setTypes(res.data);
			})
			.catch(function (error) {
				console.log(error.message);
			});

		axios
			.get(process.env.REACT_APP_BACKEND_URL + '/milestones')
			.then((res) => {
				setMilestones(res.data);
			})
			.catch(function (error) {
				console.log(error.message);
			});
	}, []);

	const severitiesMenu = severities.map((severity) => (
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
	const prioritiesMenu = priorities.map((priority) => (
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
	const typesMenu = types.map((type) => (
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
	const milestonesMenu = milestones.map((milestone) => (
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

	return (
		<Box sx={{ m: 3, display: 'flex' }}>
			{user.access_level != MANAGER_LEVEL && (
				<FormControlLabel
					control={
						<Checkbox
							defaultChecked
							checked={criteria[ALL_TICKETS]}
							color="success"
							onChange={(e) =>
								setCriteria({
									...criteria,
									ALL_TICKETS: !criteria[ALL_TICKETS]
								})
							}
						/>
					}
					label="All"
				/>
			)}
			<TextField
				autoFocus
				margin="dense"
				id="name"
				label="Search ticket"
				fullWidth
				variant="outlined"
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<ManageSearchIcon disableRipple />
						</InputAdornment>
					)
				}}
			/>

			<FormControl sx={{ m: 1, minWidth: 150 }}>
				<InputLabel id="SeverityLabel">Severity</InputLabel>
				<Select
					labelId="SeverityLabel"
					label="Severity"
					id="Severity"
					value={criteria[SEVERITY]}
					onChange={(e) =>
						setCriteria({ ...criteria, SEVERITY: e.target.value })
					}
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
						<em>All Severities</em>
					</MenuItem>
					{severitiesMenu}
				</Select>
			</FormControl>

			<FormControl sx={{ m: 1, minWidth: 150 }}>
				<InputLabel id="PriorityLabel">Priority</InputLabel>
				<Select
					labelId="PriorityLabel"
					label="Priority"
					id="Priority"
					value={criteria[PRIORITY]}
					onChange={(e) =>
						setCriteria({ ...criteria, PRIORITY: e.target.value })
					}
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
						<em>All Priorities</em>
					</MenuItem>
					{prioritiesMenu}
				</Select>
			</FormControl>

			<FormControl sx={{ m: 1, minWidth: 150 }}>
				<InputLabel id="TypeLabel">Type</InputLabel>
				<Select
					labelId="TypeLabel"
					label="Type"
					id="Type"
					value={criteria[TYPE]}
					onChange={(e) => setCriteria({ ...criteria, TYPE: e.target.value })}
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
						<em>All Types</em>
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
					value={criteria[MILESTONE]}
					onChange={(e) =>
						setCriteria({ ...criteria, MILESTONE: e.target.value })
					}
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
						<em>All Milestones</em>
					</MenuItem>
					{milestonesMenu}
				</Select>
			</FormControl>
		</Box>
	);
}
