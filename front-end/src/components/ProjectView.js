import * as React from 'react'
import { useEffect, useState } from 'react'
import ProjectColumn from './ProjectColumn'
import ProjectColumnNew from './ProjectColumnNew'
import Box from '@mui/material/Box'
import SearchPane from './SearchPane'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from 'axios'
import { MANAGER_LEVEL} from './constants/AccessLevel'
import NewColumnForm from './Forms/NewColumnForm'
import DeleteColumnForm from './Forms/DeleteColumnForm'
import EditColumnForm from './Forms/EditColumnForm'
import { modalClasses } from '@mui/material';

export default function ProjectView (props) {
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
    closeModals
	} = props
  const [columns, setColumns] = useState([])
  const [resetSearchPane, setResetSearchPane] = useState(0);

  useEffect(
		() => {
  if (currentProject) {
    setColumns(currentProject.Columns)
    setResetSearchPane(prev => prev + 1);
  }
},
		[currentProject]
	)

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
      const newColumns = JSON.parse(JSON.stringify(columns)) // deep clone
      const [movingColumn] = newColumns.splice(source.index, 1)
      newColumns.splice(destination.index, 0, movingColumn)
      console.log("source:")
      console.log(source)
      console.log("destination:")
      console.log(destination)
      setColumns(newColumns)
      
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
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].name === source.droppableId) {
            column = columns[i]
            columnIndex = i
          }
        }
        const newTickets = JSON.parse(JSON.stringify(column.Tickets)) // deep clone
        const [movingTicket] = newTickets.splice(source.index, 1)
        newTickets.splice(destination.index, 0, movingTicket)
        const newColumn = { ...column, Tickets: newTickets }
        columns[columnIndex] = newColumn
      } else {
        let sourceColumn
        let sourceColumnIndex
        let destColumn
        let destColumnIndex
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].name === source.droppableId) {
            sourceColumn = columns[i]
            sourceColumnIndex = i
          }
          if (columns[i].name === destination.droppableId) {
            destColumn = columns[i]
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

        columns[sourceColumnIndex] = newSourceColumn
        columns[destColumnIndex] = newDestColumn

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
      setColumns(prev => [...prev])
    }
  }

  const createNewColumn = function (newColumnName) {
    axios
			.post(process.env.REACT_APP_BACKEND_URL + '/columns/new', {
        name: newColumnName,
        project_id: currentProject.id
      })
            .then(res => {
        console.log(res.data)
        const newColumn = { ...res.data, Tickets: [] }
        setColumns([...columns, newColumn])
      })
            .catch(function (error) {
        console.log(error.message)
      })
  }

  const deleteColumnFromProjectView = function (columnId) {
    closeModals('deleteColumnForm')
    axios
			.delete(process.env.REACT_APP_BACKEND_URL + `/columns/${columnId}`)
			.then(res => {
  console.log(res.data)
  const newColumns = columns.filter(column => column.id !== columnId)
  setColumns([...newColumns])
})
			.catch(function (error) {
  console.log(error.message)
})
  }

  const changeColumnFromProjectView = function (columnId, newName) {
    closeModals('editColumnForm')
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
    const updatedColumn = columns.filter(column => column.id === columnId)[0]
    updatedColumn.name = newName
    setColumns([...columns])
  }

  const searchFilter = function(criteria) {
    const DESC = "DESC"
    const SEVERITY = "SEVERITY"
    const PRIORITY = "PRIORITY"
    const TYPE = "TYPE"
    const MILESTONE = "MILESTONE"
    const ALL_TICKETS = "ALL_TICKETS"

    if (!currentProject) return;
    const allColumns = JSON.parse(JSON.stringify(currentProject.Columns));
    
    allColumns.forEach(column => {
      const tickets = column.Tickets.filter(ticket => {
        let matchSeverity = true;
        let matchPriority = true;
        let matchType = true;
        let matchMilestone = true;
        let matchDescOrTitle = true;
        // filter tickets for an owner
        if (user.access_level != MANAGER_LEVEL && criteria[ALL_TICKETS] === false) {
            if (ticket.owner_id != user.id) {
              return false;
            }
        }

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
    
    setColumns([...allColumns]);
  }

  const generatedColumns = columns.map((column, colIndex) =>
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
      deleteColumnFromProjectView={deleteColumnFromProjectView}
      changeColumnFromProjectView={changeColumnFromProjectView}
      createNewColumn={createNewColumn}
		/>
	)

  return (
    <>
      <SearchPane searchFilter={searchFilter} resetSearchPane={resetSearchPane} user={user}/>
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
              {user.access_level == MANAGER_LEVEL &&
              (<ProjectColumnNew
                createNewColumn={createNewColumn}
                columnsCount={columns.length}
                openModals={openModals}
              />
              )}
              {provided.placeholder}
            </Box>}
        </Droppable>
      </DragDropContext>
    </>
  )
}
