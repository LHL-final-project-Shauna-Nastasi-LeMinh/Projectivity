import * as React from 'react';
import { useEffect, useState } from 'react';
import ProjectColumn from './ProjectColumn';
import ProjectColumnNew from './ProjectColumnNew';
import Box from '@mui/material/Box';
import SearchPane from './SearchPane';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { MANAGER_LEVEL } from './constants/AccessLevel';
import NewColumnForm from './Forms/NewColumnForm';
import DeleteColumnForm from './Forms/DeleteColumnForm';
import EditColumnForm from './Forms/EditColumnForm';
import { modalClasses, Paper } from '@mui/material';
import { COLUMN_CHANNEL, COLUMN_MOVE_EVENT } from './constants/PusherChannels';
import Pusher from 'pusher-js';
import Bin from './Bin';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/private-theming';
import { projectViewTheme } from './Theme';
import DeleteTicketDragForm from './Forms/DeleteTicketDragForm';
import { Button, Divider, Grid } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import styled from '@emotion/styled';
import { theme } from './Theme';

export default function ProjectView(props) {
	const {
		user,
		currentColumn,
		currentProject,
		setCurrentProject,
		mode,
		setViewMode,
		setCurrentColumn,
		open,
		setOpen,
		currentTicket,
		setCurrentTicket,
		modals,
		openModals,
		closeModals,
		userData,
		setUserData,
		openDrawer,
		drawerWidth,
		columns,
		setColumns
	} = props;

	const [resetSearchPane, setResetSearchPane] = useState(0);
	const [selectedColumn, setSelectedColumn] = useState();
	const [dragSource, setDragSource] = useState();

	// console.log('### USER DATA IN PROJECT VIEW USER DATA', userData[1].Columns);
	// console.log('### USER DATA IN PROJECT VIEW CURRENT PROJECT', currentProject);

	// useEffect(() => {
	// 	if (columns && currentProject) {
	// 		console.log('### currentProject', currentProject);
	// 		// console.log('### currentProject.Columns', currentProject.Columns);
	// 		// console.log('### columns', columns);
	// 		// console.log('### UPDATING COLUMNS TO CURRENT PROJECT');
	// 		setColumns(currentProject.Columns);
	// 		setResetSearchPane((prev) => prev + 1);
	// 		console.log('### COLUMNS CURRENT', currentProject.Columns);
	// 	}
	// }, [currentProject]);

	// PLEASE DO NOT REMOVE THIS . FROM LE
	// useEffect(() => {
	//   const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
	//     cluster: process.env.REACT_APP_PUSHER_CLUSTER
	//   })
	//   const channel = pusher.subscribe(COLUMN_CHANNEL);
	//   channel.bind(COLUMN_MOVE_EVENT, function (broadcastMsg) {
	//     if (!currentProject) return;
	//     if (broadcastMsg && broadcastMsg.project_id == currentProject.id) {
	//       setColumns(broadcastMsg.columns);
	//     }
	//   })
	//   return (()=>channel.unbind(COLUMN_MOVE_EVENT));
	// }, [])

	function onDragEnd(result, provided) {
		const { source, destination, type } = result;
		if (!destination) return;
		if (!destination.droppableId) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		// moving the whole column
		if (type === 'column') {
			const newColumns = JSON.parse(JSON.stringify(currentProject.Columns)); // deep clone
			const [movingColumn] = newColumns.splice(source.index, 1);
			newColumns.splice(destination.index, 0, movingColumn);
			setColumns(newColumns);

			// persist new columns ordering into db
			const orderingObject = {};
			newColumns.forEach((col, index) => {
				orderingObject[col.id] = index;
			});
			const params = {
				project_id: currentProject.id,
				ordering: orderingObject
			};
			axios
				.post(
					process.env.REACT_APP_BACKEND_URL + '/columns/reodering',
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
				});
		} else if (type === 'ticket') {
			// move to recycle bin
			if (destination.droppableId === 'ticket_bin') {
				setDragSource(source);
				openModals('deleteTicketDragForm');
			}
			// moving ticket in the same column
			else if (destination.droppableId === source.droppableId) {
				let column;
				let columnIndex;
				for (let i = 0; i < currentProject.Columns.length; i++) {
					if (currentProject.Columns[i].name === source.droppableId) {
						column = currentProject.Columns[i];
						columnIndex = i;
					}
				}
				const newTickets = JSON.parse(JSON.stringify(column.Tickets)); // deep clone
				const [movingTicket] = newTickets.splice(source.index, 1);
				newTickets.splice(destination.index, 0, movingTicket);
				const newColumn = { ...column, Tickets: newTickets };
				currentProject.Columns[columnIndex] = newColumn;
				// moving ticket to other column
			} else {
				let sourceColumn;
				let sourceColumnIndex;
				let destColumn;
				let destColumnIndex;
				for (let i = 0; i < currentProject.Columns.length; i++) {
					if (currentProject.Columns[i].name === source.droppableId) {
						sourceColumn = currentProject.Columns[i];
						sourceColumnIndex = i;
					}
					if (currentProject.Columns[i].name === destination.droppableId) {
						destColumn = currentProject.Columns[i];
						destColumnIndex = i;
					}
				}
				const newSourceTickets = JSON.parse(
					JSON.stringify(sourceColumn.Tickets)
				); // deep clone
				const newDestTickets = JSON.parse(JSON.stringify(destColumn.Tickets)); // deep clone

				const [movingTicket] = newSourceTickets.splice(source.index, 1);
				const newSourceColumn = { ...sourceColumn, Tickets: newSourceTickets };

				newDestTickets.splice(destination.index, 0, movingTicket);
				const newDestColumn = { ...destColumn, Tickets: newDestTickets };

				currentProject.Columns[sourceColumnIndex] = newSourceColumn;
				currentProject.Columns[destColumnIndex] = newDestColumn;

				// persist new column id to the ticket details in db
				axios
					.put(
						process.env.REACT_APP_BACKEND_URL +
							`/tickets/${movingTicket.id}/updateColumn`,
						{
							ticketId: movingTicket.id,
							newColumnId: destColumn.id,
							updater_name: user.first_name + ' ' + user.last_name
						}
					)
					.then((res) => {
						console.log(res.data);
						currentProject.Columns[sourceColumnIndex] = newSourceColumn;
						currentProject.Columns[destColumnIndex] = newDestColumn;
						setCurrentColumn(currentProject.Columns);
					})
					.catch(function (error) {
						console.log(error.message);
					});
			}
			// update state to retain moving position
			setColumns((prev) => [...prev]);
		}
	}

	const onDragStart = (e) => {
		const type = e.type;
		if (type === 'ticket') {
			console.log('TYPE:' + type);
		}
	};
	const onDragUpdate = (e) => {
		const type = e.type;
		if (
			type === 'ticket' &&
			e.destination &&
			e.destination.droppableId === 'ticket_bin'
		) {
			// Code goes here for Drawer onHover
		}
	};

	const createNewColumn = function (newColumnName) {
		axios
			.post(process.env.REACT_APP_BACKEND_URL + '/columns/new', {
				name: newColumnName,
				project_id: currentProject.id
			})
			.then((res) => {
				console.log(res.data);
				const newColumn = { ...res.data, Tickets: [] };
				// setColumns([...columns, newColumn]);

				currentProject.Columns.push(res.data);
				currentProject.Columns[currentProject.Columns.length - 1].Tickets = [];
				setCurrentColumn(currentProject.Columns);
			})
			.catch(function (error) {
				console.log(error.message);
			});
	};

	const deleteColumnFromProjectView = function (columnId) {
		closeModals('deleteColumnForm');
		axios
			.delete(process.env.REACT_APP_BACKEND_URL + `/columns/${columnId}`)
			.then((res) => {
				console.log(res.data);
				const newColumns = currentProject.Columns.filter(
					(column) => column.id !== columnId
				);
				setColumns([...newColumns]);

				currentProject.Columns.map((column, index) => {
					if (column.id === columnId) {
						currentProject.Columns.splice(index, 1);
					}
				});
				setCurrentColumn(currentProject.Columns);
			})
			.catch(function (error) {
				console.log(error.message);
			});
	};

	const changeColumnFromProjectView = function (columnId, newName) {
		closeModals('editColumnForm');

		axios
			.post(process.env.REACT_APP_BACKEND_URL + '/columns/updateName', {
				name: newName,
				id: columnId
			})
			.then((res) => {
				console.log(res.data);
				currentProject.Columns.map((column) => {
					if (column.id === columnId) {
						column.name = newName;
					}
				});
				setCurrentColumn(currentProject.Columns);
			})
			.catch(function (error) {
				console.log(error.message);
			});

		const updatedColumn = currentProject.Columns.filter(
			(column) => column.id === columnId
		)[0];
		updatedColumn.name = newName;
		setColumns([...columns]);
		setCurrentProject({
			...currentProject,
			Columns: [...currentProject.Columns]
		});
	};

	const deleteTicketByDragDrop = function (dragSource) {
		closeModals('deleteTicketDragForm');
		let column;
		let columnIndex;
		for (let i = 0; i < currentProject.Columns.length; i++) {
			if (currentProject.Columns[i].name === dragSource.droppableId) {
				column = currentProject.Columns[i];
				columnIndex = i;
			}
		}
		const newTickets = JSON.parse(JSON.stringify(column.Tickets)); // deep clone
		const [movingTicket] = newTickets.splice(dragSource.index, 1);
		const newColumn = { ...column, Tickets: newTickets };
		currentProject.Columns[columnIndex] = newColumn;
		axios
			.delete(
				process.env.REACT_APP_BACKEND_URL + `/tickets/${movingTicket.id}`,
				{
					data: {
						owner_id: movingTicket.owner_id,
						title: movingTicket.title,
						updater_name: user.first_name + ' ' + user.last_name
					}
				}
			)
			.then((res) => {
				console.log('Ticket removed successfully');
			})
			.catch(function (error) {
				console.log(error.message);
			});
	};

	const searchFilter = function (criteria) {
		const DESC = 'DESC';
		const SEVERITY = 'SEVERITY';
		const PRIORITY = 'PRIORITY';
		const TYPE = 'TYPE';
		const MILESTONE = 'MILESTONE';
		const ALL_TICKETS = 'ALL_TICKETS';

		if (!currentProject) return;
		if (!currentProject.Columns) return;
		const allColumns = JSON.parse(JSON.stringify(currentProject.Columns));

		allColumns.forEach((column) => {
			const tickets = column.Tickets.filter((ticket) => {
				let matchSeverity = true;
				let matchPriority = true;
				let matchType = true;
				let matchMilestone = true;
				let matchDescOrTitle = true;
				// filter tickets for an owner
				if (
					user.access_level != MANAGER_LEVEL &&
					criteria[ALL_TICKETS] === false
				) {
					if (ticket.owner_id != user.id) {
						return false;
					}
				}

				if (criteria[DESC] !== '') {
					matchDescOrTitle =
						ticket.title.toLowerCase().includes(criteria[DESC].toLowerCase()) ||
						ticket.description
							.toLowerCase()
							.includes(criteria[DESC].toLowerCase());
				}
				if (criteria[SEVERITY] !== 'All') {
					matchSeverity = ticket.severity === criteria[SEVERITY];
				}
				if (criteria[PRIORITY] !== 'All') {
					matchPriority = ticket.priority === criteria[PRIORITY];
				}
				if (criteria[TYPE] !== 'All') {
					matchType = ticket.type === criteria[TYPE];
				}
				if (criteria[MILESTONE] !== 'All') {
					matchMilestone = ticket.milestone === criteria[MILESTONE];
				}
				return (
					matchSeverity &&
					matchPriority &&
					matchType &&
					matchMilestone &&
					matchDescOrTitle
				);
			});
			column.Tickets = tickets;
		});

		setColumns([...allColumns]);
	};

	return (
		<Box
			sx={{
				position: 'absolute',
				margin: '1rem',
				flexGrow: 1,
				...(!openDrawer && {
					left: '1rem',
					transition: 'left 0.2s ease-out'
				}),
				...(openDrawer && {
					left: `${drawerWidth}rem`,
					transition: 'left 0.20s linear'
				})
			}}
		>
			<Box
				sx={{
					maxWidth: '80rem',
					minWidth: '60rem',
					width: 'fit-content'
				}}
			>
				<SearchPane
					searchFilter={searchFilter}
					resetSearchPane={resetSearchPane}
					user={user}
				/>
			</Box>
			<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
				<Droppable
					droppableId="all-column"
					direction="horizontal"
					type="column"
				>
					{(provided) => (
						<Box
							sx={{
								height: '42rem',
								minHeight: '42rem',
								maxHeight: '42rem',
								width: `${columns.length * 16 + 4}rem`,
								// width: 'min-content',
								minWidth: '90%',
								maxWidth: '100%',
								display: 'flex',
								flexDirection: 'row'
							}}
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{currentProject && (
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'row',
										margin: '1rem'
									}}
								>
									{currentProject.Columns !== undefined &&
										currentProject.Columns.map((column, colIndex) => (
											<ProjectColumn
												disablePadding
												key={column.id}
												user={user}
												title={column.name}
												column={column}
												setViewMode={setViewMode}
												currentColumn={currentColumn}
												setCurrentColumn={setCurrentColumn}
												currentTicket={currentTicket}
												setCurrentTicket={setCurrentTicket}
												colIndex={colIndex}
												open={open}
												setOpen={setOpen}
												modals={modals}
												openModals={openModals}
												closeModals={closeModals}
												deleteColumnFromProjectView={
													deleteColumnFromProjectView
												}
												changeColumnFromProjectView={
													changeColumnFromProjectView
												}
												createNewColumn={createNewColumn}
												selectedColumn={selectedColumn}
												setSelectedColumn={setSelectedColumn}
												currentProject={currentProject}
												setCurrentProject={setCurrentProject}
												userData={userData}
												setUserData={setUserData}
												setColumns={setColumns}
											/>
										))}

									{user.access_level == MANAGER_LEVEL &&
										currentProject.Columns !== undefined && (
											<ProjectColumnNew
												createNewColumn={createNewColumn}
												columnsCount={currentProject.Columns.length}
												openModals={openModals}
											/>
										)}
									{provided.placeholder}
								</Box>
							)}
						</Box>
					)}
				</Droppable>
				<Bin />
			</DragDropContext>
			{modals.deleteTicketDragForm && (
				<DeleteTicketDragForm
					modals={modals}
					closeModals={closeModals}
					dragSource={dragSource}
					deleteTicket={deleteTicketByDragDrop}
				/>
			)}
		</Box>
	);
}
// deleteColumn={deleteColumnFromProjectView}
// currentProject={currentProject}
// userData={userData}
// setCurrentColumn={setCurrentColumn}
