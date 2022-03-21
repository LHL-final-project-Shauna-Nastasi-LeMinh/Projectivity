import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProjectTicket from './ProjectTicket'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function ProjectColumn (props) {
  const { user, column, colIndex } = props
  const [tickets, setTickets] = useState([])

  useEffect(
        () => {
      setTickets(column.Tickets)
    },
		[column]
	)

  let index = 0
  const generatedTickets = tickets.map((ticket, index) => {
    return (
      <Draggable key={""+ticket.id} draggableId={"ticket_"+ticket.id} index={index}>
        {(provided, snapshot) => (
          <div 
            {...provided.draggableProps} 
            {...provided.dragHandleProps} 
            ref={provided.innerRef}
            
          >
            <ProjectTicket title={ticket.description} ticketId={ticket.id} isDragging={snapshot.isDragging} />
          </div>
        )}
      </Draggable>
    )
  })

  const viewTicketDetails = function() {
    console.log("CLICKED VIEW TICKET DETAILS");
  }

  return (
    <Draggable draggableId={"column_"+column.id} index={colIndex}>
      {(provided) => (
        <Box 
          sx={{ width: '20rem', mx: '1rem', backgroundColor: 'white' }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ListItem> 
            <ListItemButton>
              <ListItemText primary={column.name} />
            </ListItemButton>
          </ListItem>
          <Divider />
      
          <Droppable droppableId={column.name} type="ticket">
            {(provided, snapshot) => (
              <List {...provided.droppableProps} 
                ref={provided.innerRef} 
                isDraggingOver={snapshot.isDraggingOver} 
                sx={{ backgroundColor: snapshot.isDraggingOver ? 'skyblue' : 'inherit', transition: 'background-color 1s ease'}}
              >
                {generatedTickets}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
          <ProjectTicket title='Create a new ticket' key={-1} />
        </Box>
      )}
    </Draggable>
  )
}
