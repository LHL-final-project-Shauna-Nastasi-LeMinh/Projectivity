import * as React from 'react'
import { useEffect, useState } from 'react'
import ProjectColumn from './ProjectColumn'
import ProjectColumnNew from './ProjectColumnNew'
import Box from '@mui/material/Box'
import SearchPane from './SearchPane'
import NewProjectForm from './Forms/NewProjectForm'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'

export default function ProjectView (props) {
  const {
		user,
		currentProject,
		mode,
		setViewMode,
		setCurrentColumn,
		open,
		setOpen,
    currentTicket, 
    setCurrentTicket,
    state
	} = props
  // const [columns, setColumns] = useState([])

//   useEffect(
// 		() => {
//   if (currentProject) {
//     setColumns(currentProject.Columns)
//   }
// },
// 		[currentProject]
// 	)

  function onDragEnd (result, provided) {
    const { source, destination, type } = result
    if (!destination) return
    if (!destination.droppableId) return
    if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
      return
    }

		// moving the whole column
    if (type === 'column') {
			// const newColumns = JSON.parse(JSON.stringify(columns)) // deep clone
      const newColumns = state.currentColumns
      const [movingColumn] = newColumns.splice(source.index, 1)
      newColumns.splice(destination.index, 0, movingColumn)
      console.log("source:")
      console.log(source)
      console.log("destination:")
      console.log(destination)

			// setColumns(newColumns)
      state.setStateTarget('currentColumns', newColumns)

			// persist new columns ordering into db
      const orderingObject = {}
      newColumns.forEach((col, index) => {
        orderingObject[col.id] = index;
      })
        
      axios.post(process.env.REACT_APP_BACKEND_URL + '/columns/reodering', 
        JSON.stringify(orderingObject), 
        { headers: {
          'Content-Type': 'application/json'
          }
        })
        .then(res => {
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error.message)
        })
    } else if (type === 'ticket') {
			// moving ticket
      if (destination.droppableId === source.droppableId) {
        let column
        let columnIndex
        for (let i = 0; i < state.currentColumns.length; i++) {
          if (state.currentColumns[i].name === source.droppableId) {
            column = state.currentColumns[i]
            columnIndex = i
          }
        }
        const newTickets = JSON.parse(JSON.stringify(column.Tickets)) // deep clone
        const [movingTicket] = newTickets.splice(source.index, 1)
        newTickets.splice(destination.index, 0, movingTicket)
        const newColumn = { ...column, Tickets: newTickets }
        state.currentColumns[columnIndex] = newColumn
      } else {
        let sourceColumn
        let sourceColumnIndex
        let destColumn
        let destColumnIndex
        for (let i = 0; i < state.currentColumns.length; i++) {
          if (state.currentColumns[i].name === source.droppableId) {
            sourceColumn = state.currentColumns[i]
            sourceColumnIndex = i
          }
          if (state.currentColumns[i].name === destination.droppableId) {
            destColumn = state.currentColumns[i]
            destColumnIndex = i
          }
        }
        const newSourceTickets = JSON.parse(
					JSON.stringify(sourceColumn.Tickets)
				) // deep clone
        const newDestTickets = JSON.parse(JSON.stringify(destColumn.Tickets)) // deep clone

        const [movingTicket] = newSourceTickets.splice(source.index, 1)
        const newSourceColumn = { ...sourceColumn, Tickets: newSourceTickets }

        newDestTickets.splice(destination.index, 0, movingTicket)
        const newDestColumn = { ...destColumn, Tickets: newDestTickets }

        state.currentColumns[sourceColumnIndex] = newSourceColumn
        state.currentColumns[destColumnIndex] = newDestColumn

				// persist new column id to the ticket details in db
        axios
					.post(process.env.REACT_APP_BACKEND_URL + '/tickets/updateColumn', {
            ticketId: movingTicket.id,
            newColumnId: destColumn.id
          })
                    .then(res => {
            console.log(res.data)
          })
                    .catch(function (error) {
            console.log(error.message)
          })
      }
			// update state to retain moving position
			// setColumns(prev => [...prev])
      state.setStateTarget('currentColumns', prev => [...prev])
    }
  }

  const createNewColumn = function (newColumnName) {
    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/columns/new', {
  name: newColumnName,
  project_id: state.currentProject.id
})
			.then(res => {
  console.log(res.data)
  const newColumn = { ...res.data, Tickets: [] }
				// setColumns([...columns, newColumn])
  state.setStateTarget('currentColumns', [
    ...state.currentColumns,
    newColumn
  ])
})
			.catch(function (error) {
  console.log(error.message)
})
  }

  const deleteColumnFromProjectView = function (columnId) {
    console.log(columnId)
    axios
			.delete(process.env.REACT_APP_BACKEND_URL + `/columns/${columnId}`)
			.then(res => {
  console.log(res.data)
  const newColumns = state.currentColumns.filter(
					column => column.id !== columnId
				)
				// setColumns([...newColumns])
  state.setStateTarget('currentColumns', [...newColumns])
})
			.catch(function (error) {
  console.log(error.message)
})
  }

  const changeColumnFromProjectView = function (columnId, newName) {
    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/columns/updateName', {
  name: newName,
  id: columnId
})
			.then(res => {
  console.log(res.data)
})
			.catch(function (error) {
  console.log(error.message)
})
    const updatedColumn = state.currentColumns.filter(
			column => column.id === columnId
		)[0]
    updatedColumn.name = newName
		// setColumns([...columns])
    state.setStateTarget('currentColumns', [...state.currentColumns])
  }

  const searchFilter = function(criteria) {
    const DESC = "DESC"
    const SEVERITY = "SEVERITY"
    const PRIORITY = "PRIORITY"
    const TYPE = "TYPE"
    const MILESTONE = "MILESTONE"

    const allColumns = state.currentColumns;
    
    allColumns.forEach(column => {
      const tickets = state.currentTickets.filter(ticket => {
        let matchSeverity = true;
        let matchPriority = true;
        let matchType = true;
        let matchMilestone = true;
        let matchDescOrTitle = true;

        if (criteria[DESC] !== "") {
          matchDescOrTitle = ticket.title.toLowerCase().includes(criteria[DESC].toLowerCase()) 
            || ticket.description.toLowerCase().includes(criteria[DESC].toLowerCase())
        }
        if (criteria[SEVERITY] !== "All") {
          matchSeverity = (ticket.severity === criteria[SEVERITY]);
        }
        if (criteria[PRIORITY] !== "All") {
          matchPriority = (ticket.priority === criteria[PRIORITY]);
        }
        if (criteria[TYPE] !== "All") {
          matchType = (ticket.type === criteria[TYPE]);
        }
        if (criteria[MILESTONE] !== "All") {
          matchMilestone = (ticket.milestone === criteria[MILESTONE]);
        }
        return matchSeverity && matchPriority && matchType && matchMilestone && matchDescOrTitle;
      })
      column.Tickets = tickets;
    })
    
    state.setStateTarget('currentColumns', [...allColumns])
    // setColumns([...allColumns]);
  }

  const generatedColumns = state.currentColumns.map((column, colIndex) =>
    <ProjectColumn
      state={state}
      disablePadding
      key={column.id}
      title={column.name}
      column={column}
      setViewMode={setViewMode}
      setCurrentColumn={setCurrentColumn}
      currentTicket={currentTicket} 
      setCurrentTicket={setCurrentTicket}
      colIndex={colIndex}
      open={open}
      setOpen={setOpen}
      deleteColumnFromProjectView={deleteColumnFromProjectView}
      changeColumnFromProjectView={changeColumnFromProjectView}
		/>
	)

  return (
    <>
      <SearchPane searchFilter={searchFilter}/>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='all-column' direction='horizontal' type='column'>
          {provided =>
            <Box
              disablePadding
              sx={{ display: 'flex' }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {generatedColumns}
              <ProjectColumnNew
                name={'+ New Column'}
                createNewColumn={createNewColumn}
                columnsCount={state.currentColumns.length}
              />
              {provided.placeholder}
            </Box>}
        </Droppable>
      </DragDropContext>
    </>
  )
}
