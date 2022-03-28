import React from 'react';
import { format } from "date-fns";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {List, ListItem, Divider, ListItemText, Avatar, Chip} from '@mui/material'

import useEmployeesData from '../../hooks/useEmployeesData';

import { choosePriorityColor, chooseSeverityColor } from '../../helpers/colorHelper';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 3, backgroundColor: 'primary.main',  color: 'background.default'}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
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
  onClose: PropTypes.func.isRequired,
};

export default function ShowTicketDetails(props) {

  const {dialogOpen, setDialogOpen, ticketId, tickets} = props

  const ticketDetails = tickets.filter(ticket => ticket.id === ticketId)[0]

  console.log("TICKETDETAILS???", ticketDetails)

  const handleClose = () => {
    console.log(tickets)
    setDialogOpen(false);
  };

  const currentEmployee = useEmployeesData(ticketDetails.owner_id, tickets)

  console.log("DATA CURR EMPLOYE TICKET>>", currentEmployee)

  return (
    
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
        fullWidth
        maxWidth ='md'
      >
        <BootstrapDialogTitle 
          id="customized-dialog-title" 
          onClose={handleClose}
          sx={{display: "inline-flex", backgroundColor: 'primary.main', color: 'white'}}
          >
         
          {`Ticket: ${ticketDetails.title}`}
          {Object.keys(currentEmployee).length !== 0 && ticketDetails.owner_id && 
				  <Avatar 
					sx={{ width: 30, height: 30, borderRadius: 1, ml: 3}}
					size={100}
					alt='JON'
					src={currentEmployee.avatar}>
						<img alt={`${currentEmployee.first_name[0]}${currentEmployee.last_name[0]}`}></img>
						</Avatar>
        }
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <List
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
            }}
          >
            <ListItem>
             
              <ListItemText primary="Description:" secondary={ticketDetails.description} />
            </ListItem>

            <Divider component="li" />

            <ListItem>
             
              <ListItemText primary="Created at:" secondary={ticketDetails.createdAt.substring(0,10)} />
            </ListItem>
          

          {/* <Divider component="li" /> */}

          {ticketDetails.severity && (
            <>
            <Divider component="li" />

            <ListItem>
             
              <ListItemText primary="Severity:" secondary={
                <Chip
                pl="2"
                label={ticketDetails.severity}
              
                 style={{backgroundColor: chooseSeverityColor(ticketDetails.severity), fontWeight:'700'}}
                 size="small"
             />} />
            </ListItem>
          
          </>
          )}
          

          {ticketDetails.priority && (
            <>
            <Divider component="li" />

            <ListItem>
             
              <ListItemText primary="Priority:" 
              
              secondary={
                
                <Chip
                  pl="2"
                  label={ticketDetails.priority}
                
			       		  style={{backgroundColor: choosePriorityColor(ticketDetails.priority), fontWeight:'700'}}
                   size="small"
               />
                } />
            </ListItem>
          
          </>
          )}

          {ticketDetails.type && (
            <>
            <Divider component="li" />

            <ListItem>
             
              <ListItemText primary="Type:" secondary={ticketDetails.type} />
            </ListItem>
          
          </>
          )}

          {ticketDetails.milestone && (
            <>
            <Divider component="li" />

            <ListItem>
             
              <ListItemText primary="Milestone:" secondary={ticketDetails.milestone} />
            </ListItem>
          
          </>
          )}

          {ticketDetails.owner_id && (
            <>
            <Divider component="li" />

            <ListItem>
             
              <ListItemText primary="Assigned To:" secondary={`${currentEmployee.first_name} ${currentEmployee.last_name} - ${currentEmployee.email}`} />
            </ListItem>
          
          </>
          )}

          </List>
        </DialogContent>
  
      </BootstrapDialog>
    
  );
}