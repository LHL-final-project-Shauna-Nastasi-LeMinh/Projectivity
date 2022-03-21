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
  const { user, column, handleOnDragEnd } = props
  const [tickets, setTickets] = useState([])

  useEffect(
        () => {
      setTickets(column.Tickets)
    },
		[column]
	)

  let index = 0
  const generatedTickets = tickets.map((ticket, index) => {
    const id = ""+ticket.id
    return (
      <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
          <div 
            {...provided.draggableProps} 
            {...provided.dragHandleProps} 
            ref={provided.innerRef} 
          >
            <ProjectTicket title={ticket.description} />
          </div>
        )}
      </Draggable>
    )
  })

  return (
    <Box sx={{ width: '20rem', mx: '1rem' }}>
      
        <Droppable droppableId={column.name}>
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={column.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
              {generatedTickets}
              
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      <ProjectTicket title='Create a new ticket' key={-1} />
    </Box>
  )
}
