import * as React from 'react';
import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { Box, Chip, Typography, Popover, Avatar, Stack } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Fade from '@mui/material/Fade';
import RemoveTicket from './Forms/RemoveTicket'
import ShowTicketDetails from './Forms/ShowTicketDetails'
import NewTicketForm from './Forms/NewTicketForm'
import TicketHistory from './Forms/TicketHistory';
import AssignTicket from './Forms/AssignTicket';
import { BlockRounded } from '@mui/icons-material'

import useEmployeesData from "../hooks/useEmployeesData";
import axios from 'axios'

import {
	SHOW_TICKET_DETAILS,
	EDIT_TICKET,
	REMOVE_TICKET,
	ADD_TICKET,
	TICKET_HISTORY,

} from './constants/Modes';
import { MANAGER_LEVEL } from './constants/AccessLevel';
import { modalClasses } from '@mui/material';

export default function ProjectTicket (props) {
  
		const {
			title,
			value,
			ticketId,
			setViewMode,
			setOpen,
			tickets,
			setTickets,
			user,
			currentColumn,
			ticket,
			setCurrentColumn,
			currentProject,
			userData,
			setUserData,
			editTicket,
			setEditTicket
		} = props;


  const [checked, setChecked] = React.useState([1])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentTicket, setCurrentTicket] = useState()


  // handle opening and closing of MoreVertIcon
  const [anchorEl, setAnchorEl] = useState(null);
	const [anchorPop, setAnchorPop] = useState(null);
	const openPop = Boolean(anchorPop);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const closeMenu = () => {
    setAnchorEl(null)
  }

	// for popover
	const id = openPop ? 'simple-popover' : undefined;

	const openPopover = (event) => {
		console.log(ticketId)
		setAnchorPop(event.currentTarget);
	}

	const closePopover = () => {
		setAnchorPop(false);
	}


	const handleDialogOpening = (evt) => {
		console.log(evt.target.id);
		console.log(evt.currentTarget)

		if (evt.target.id === 'edit') {
			// openModals('newTicketForm');
			setEditTicket(true);
			setDialogOpen(EDIT_TICKET);
			setCurrentTicket(ticketId);
		}

		if (evt.target.id === 'details') {
			setDialogOpen(SHOW_TICKET_DETAILS);
			console.log(dialogOpen);
		}

		if (evt.target.id === 'remove') {
			setDialogOpen(REMOVE_TICKET);
			console.log(dialogOpen);
		}

		if (evt.target.id === 'history') {
			setDialogOpen(TICKET_HISTORY);
			console.log(dialogOpen);
		}

		closeMenu();
	};


	
	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const choosePriorityColor = (priority) => {
		let color = '';
		switch(priority) {
			case 'Urgent':
				color = '#f72d2d'
				break;
			case 'Essential':
				color = '#d45917'
				break;
			case 'Valuable':
				color = '#ebc310'
				break;
			case 'Discretionary':
				color = '#92d417'
				break;
			default:
				color= 'grey'
		}
		return color;
	}

	
	

	const employee = useEmployeesData(ticket.owner_id)


	console.log("EMPLOYE>>>STATE>>>>>>", employee)

  return (

		
    
    <ListItem sx={{  display: "block"}}>
			<Stack direction="row" spacing={1}>
				{ticket.priority &&
					<Chip
          pl="2"
          label={ticket.priority}
         
					style={{backgroundColor: choosePriorityColor(ticket.priority), fontWeight:'700'}}
          size="small"
        />
				}
				{Object.keys(employee).length !== 0 && ticket.owner_id && employee.avatar &&
				  <Avatar 
					sx={{ width: 24, height: 24 }}
					size={100}
  				backgroundColor='rgba(0,0,0,0)'
					
					alt="Remy Sharp" src="https://ca.slack-edge.com/T2G8TE2E5-U02SX82DQR4-fed59f9b552e-512" /> && console.log(employee.avatar)
					
        }
				{Object.keys(employee).length !== 0 && ticket.owner_id && !employee.avatar &&
				<Avatar 
					sx={{ width: 24, height: 24 }}
					 >
						 {`${employee.first_name[0]}${employee.last_name[0]}`}
					 </Avatar>
					
        }
				</Stack>
        
        
      <ListItemButton
        sx={{
          
          px: '0',
          display:"flex", justifyContent:"space-between", alignItems:"center"
        }}
        
			>
        

       
          <div>
        <ListItemText primary={title} sx={{ fontSize: 'small'}}/>
        </div>
        
        
        <div style={{ display: "inherit"}}>
        <IconButton 
					sx={{px:"0"}}
					aria-describedby={id} 
					variant="contained"
					onClick={openPopover}
				>
					<PersonAddIcon 
					sx={{ fontSize: 'small'}}
					
					/>
					</IconButton >

					<Popover
				    id={id}
				    open={anchorPop}
				    anchorEl={anchorPop}
				    onClose={closePopover}
				    anchorOrigin={{
				    vertical: 'bottom',
				    horizontal: 'right',
				  }}
				>
				  <Typography sx={{ p: 2 }}>
						<AssignTicket
							currentProject={currentProject}
							ticketId={ticketId}
							setAnchorPop={setAnchorPop}
							setTickets={setTickets}
							tickets={tickets}
						/>
					</Typography>
				</Popover>



        <IconButton
          id="fade-button"
          aria-controls={openMenu ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? 'true' : undefined}
          onClick={handleClick}
          sx={{px:"0", ml:"1"}}
        >  
          <MoreVertIcon />

        </IconButton>

        {dialogOpen === SHOW_TICKET_DETAILS &&
          <ShowTicketDetails
          tickets={tickets}
          setTickets={setTickets}
          ticketId={ticketId}
          setViewMode={setViewMode}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          
					/>}
          {dialogOpen === REMOVE_TICKET && 
          <RemoveTicket
          tickets={tickets}
          setTickets={setTickets}
          ticketId={ticketId}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
					currentProject={currentProject}
					userData={userData}
					setCurrentColumn={setCurrentColumn}
          
          
					/>}

          {dialogOpen === EDIT_TICKET &&
        <NewTicketForm
          user={user}
          currentColumn={currentColumn}
          tickets={tickets}
          setTickets={setTickets}
          dialogOpen={dialogOpen}
          ticketId={ticketId}
          setDialogOpen={setDialogOpen}
          title = "Edit Ticket"
          onsubmitMsg="Edit Ticket"
          currentTicket={currentTicket}
					currentProject={currentProject}
					userData={userData}
					setUserData={setUserData}
					editTicket={editTicket}
          
        
					/>}

					{dialogOpen === TICKET_HISTORY && (
						<TicketHistory
							tickets={tickets}
							setTickets={setTickets}
							ticketId={ticketId}
							dialogOpen={dialogOpen}
							setDialogOpen={setDialogOpen}
						/>
					)}
          
        <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={closeMenu}
        TransitionComponent={Fade}
      >
        <MenuItem id="details" onClick={evt => handleDialogOpening(evt)}>
          Details
          </MenuItem>
        <MenuItem id="edit" onClick={handleDialogOpening}>Edit</MenuItem>
        {user.access_level == MANAGER_LEVEL &&
          <MenuItem  id="remove" onClick={evt =>handleDialogOpening(evt)}>Remove</MenuItem>
        }
				<MenuItem id="history" onClick={handleDialogOpening}>
							History
						</MenuItem>
      </Menu>
      </div>
      

      </ListItemButton>
    </ListItem>
  
  )
}
