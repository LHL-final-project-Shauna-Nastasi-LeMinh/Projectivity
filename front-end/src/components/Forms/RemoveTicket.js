import React, { useState } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';

import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

<<<<<<< HEAD
export default function RemoveTicket (props) {
  const {
=======
export default function RemoveTicket(props) {
	const {
>>>>>>> feature/notification-drawer
		dialogOpen,
		setDialogOpen,
		ticketId,
		tickets,
		setTickets,
<<<<<<< HEAD
		state
	} = props

  const onConfirmDelete = () => {
    axios
			.delete(process.env.REACT_APP_BACKEND_URL + `/tickets/${ticketId}`)
			.then(res => {
  const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId)
  setTickets([...updatedTickets])

  setDialogOpen(false)
})
			.catch(function (error) {
  console.log(error.message)
})
  }

  const handleClose = () => {
    console.log(ticketId)
    setDialogOpen(false)
  }

  return (
    <Dialog
      open={dialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
		>
      <DialogTitle>Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
					Are you sure you want to delete this ticket?
				</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirmDelete}>Delete</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
=======
		currentProject,
		currentColumn,
		setCurrentColumn,
		userData
	} = props;

	const onConfirmDelete = () => {
		axios
			.delete(process.env.REACT_APP_BACKEND_URL + `/tickets/${ticketId}`)
			.then((res) => {
				const updatedTickets = tickets.filter(
					(ticket) => ticket.id !== ticketId
				);
				setTickets([...updatedTickets]);

				// console.log('updatedTickets', updatedTickets, tickets, ticketId);
				// console.log('updatedTickets', currentProject);
				currentProject.Columns.map((column) => {
					column.Tickets.map((ticket, index) => {
						if (ticket.id === ticketId) {
							column.Tickets.splice(index, 1);
							setCurrentColumn(column);
						}
					});
				});

				setDialogOpen(false);
			})
			.catch(function (error) {
				console.log(error.message);
			});
	};

	const handleClose = () => {
		console.log(ticketId);
		setDialogOpen(false);
	};

	return (
		<Dialog
			open={dialogOpen}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle>Delete</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete this ticket?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onConfirmDelete}>Delete</Button>
				<Button onClick={handleClose}>Cancel</Button>
			</DialogActions>
		</Dialog>
	);
>>>>>>> feature/notification-drawer
}
