import * as React from 'react'
import { useEffect, useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import ProjectColumn from './ProjectColumn'
import Box from '@mui/material/Box'
import NewProjectForm from './NewProjectForm'
import { ADDPROJECT } from './constants/Modes'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function ProjectView (props) {
  const { user, currentProject, mode } = props
  const [columns, setColumns] = useState([])

  useEffect(
		() => {
  if (currentProject) {
    setColumns(currentProject.Columns)
  }
},
		[currentProject]
	)

  function handleOnDragEnd(result) {
    const {source, destination, draggableId} = result;
    console.log("destination.droppableId:"+ destination.droppableId);
    console.log("source.droppableId:"+ source.droppableId);
    console.log("destination.index:"+ destination.index);
    console.log("source.index:"+ source.index);
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    
    // const column = columns.filter(col => col.name === source.droppableId)[0];
    let column;
    let columnIndex;
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].name === source.droppableId) {
        column = columns[i];
        columnIndex = i;
      }
    }
    const newTickets = JSON.parse(JSON.stringify(column.Tickets)); // deep clone
    const [movingTicket] = newTickets.splice(source.index, 1);
    newTickets.splice(destination.index, 0, movingTicket);
    const newColumn = {...column, Tickets: newTickets};
    columns[columnIndex] = newColumn;
    setColumns(prev => [...prev])

    // setTickets(newTickets);
    // const columnArray = Array.from(columns);
    // console.log(columnArray) ;
    // const sourceColumn = columnArray.filter(column => column.name === result.source.droppableId)[0];
    // const destColumn = columnArray.filter(column => column.name === result.destination.droppableId)[0];
    // const movingItem = sourceColumn.splice(result.source.index, 1);
    // console.log(sourceColumn);
    // console.log(destColumn);
    // console.log(movingItem);
    // // destColumn


    
  }

  const generatedColumns = columns.map(column =>
    <ProjectColumn
      key={column.id}
      user={user}
      title={column.name}
      column={column}
      handleOnDragEnd={handleOnDragEnd}
		/>
	)

  return (
    <Box sx={{ display: 'flex' }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {generatedColumns}
      </DragDropContext>
    </Box>
  )
}
