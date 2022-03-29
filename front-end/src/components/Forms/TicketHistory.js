import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { List, ListItem, Divider, ListItemText } from '@mui/material';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	'& .MuiDialogContent-root': {
		padding: theme.spacing(2)
	},
	'& .MuiDialogActions-root': {
		padding: theme.spacing(1)
	}
}));

const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle
			sx={{
				m: 0,
				p: 2,
				backgroundColor: 'primary.main',
				color: 'background.default'
			}}
			{...other}
		>
			{children}
			{onClose ? (
				<IconButton
					disableRipple
					aria-label="close"
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500]
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired
};

export default function TicketHistory(props) {
	const { dialogOpen, setDialogOpen, ticketId, tickets } = props;
	const [ticketHistories, setTicketHistories] = useState([]);

	const ticketDetails = tickets.filter((ticket) => ticket.id === ticketId)[0];

	const handleClose = () => {
		console.log(tickets);
		setDialogOpen(false);
	};

	const events = {
		CREATED: ' created ticket on ',
		'STATUS CHANGE': ' changed STATUS',
		'TITLE CHANGE': ' changed TITLE',
		'SEVERITY CHANGE': ' changed SEVERITY',
		'PRIORITY CHANGE': ' changed PRIORITY',
		'TYPE CHANGE': ' changed TYPE',
		'MILESTONE CHANGE': ' changed MILESTONE',
		'ASSIGNEE CHANGE': ' changed ASSIGNEE'
	};

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_URL + `/histories/${ticketId}`)
			.then((res) => {
				if (res && res.data) {
					console.log(res.data);
					const generatedHistory = res.data.map((record) => (
						<>
							<Divider component="li" />
							<ListItem key={record.id}>
								{record.event !== 'CREATED' &&
									record.source_value !== null &&
									record.source_value !== 'null' && (
										<ListItemText
											secondary={
												record.updater +
												events[record.event] +
												' from ' +
												record.source_value +
												' to ' +
												record.dest_value +
												' at ' +
												record.updatedAt.substring(0, 10)
											}
										/>
									)}
								{record.event !== 'CREATED' &&
									(record.source_value === null ||
										record.source_value === 'null') && (
										<ListItemText
											secondary={
												record.updater +
												events[record.event] +
												' to ' +
												record.dest_value +
												' at ' +
												record.updatedAt.substring(0, 10)
											}
										/>
									)}
								{record.event == 'CREATED' && (
									<ListItemText
										secondary={
											record.updater +
											' created ticket on ' +
											record.updatedAt.substring(0, 10)
										}
									/>
								)}
							</ListItem>
						</>
					));

					setTicketHistories(generatedHistory);
				}
			});
	}, []);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={dialogOpen}
      fullWidth
      maxWidth="md"
      PaperProps = {{
        style: {
          backgroundColor: "#f7ede2",
          bgColor: "#f7ede2",
        }
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
        {"History - "}
        {ticketDetails.title}
      </BootstrapDialogTitle>
      <DialogContent fullWidth>
        <List
          sx={{
            width: "100%",
            backgroundColor: "background.default",
            color: "background.paper",
          }}
        >
          {ticketHistories}
        </List>
      </DialogContent>
    </BootstrapDialog>
  );
}
