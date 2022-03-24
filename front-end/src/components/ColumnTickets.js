import React, { useEffect, useState, forwardRef } from 'react'
import ProjectTicket from './ProjectTicket'
import { Droppable, Draggable } from 'react-beautiful-dnd'

// React.memo(function ColumnTickets(props)
export default function ColumnTickets (props) {
  const { state } = props

  return state.currentTickets.map((ticket, index) => {
    return (
      <Draggable
        key={'' + ticket.id}
        draggableId={'ticket_' + ticket.id}
        index={index}
			>
        {(provided, snapshot) =>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
					>
            <ProjectTicket
              state={state}
              ticket={ticket}
              title={ticket.title}
              description={ticket.description}
              ticketId={ticket.id}
              isDragging={snapshot.isDragging}
						/>
          </div>}
      </Draggable>
    )
  })
}
