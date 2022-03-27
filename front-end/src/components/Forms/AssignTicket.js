import React, {useEffect, useState} from "react";
import axios from "axios";

import { FormControl, InputLabel, Select, MenuItem, Button, Box, Typography } from "@mui/material";


export default function AssignTicket(props) {

  const {currentProject} = props

  const [employees, setEmployees] = useState({
    all: []
  });

  const [value, setValue] = useState('');

  const handleChange = (evt) => {
    setValue(evt.target.value)
  }

  // fetch current project assignees from db
  useEffect(() => {

    axios
				.get(
					process.env.REACT_APP_BACKEND_URL + `/projects/${currentProject.id}/assignees`
				)
				.then((res) => {
          if (res && res.data) {
						console.log("RESPONSE", res.data)
						setEmployees({ all: res.data });
            console.log("STATE", employees)
          }
				})
        .catch(function (error) {
          console.log(error.message);
        })
  }, [])

// mapped through employees to render menu item list
  const employeeList = employees.all.map((employee) => {
    let fullName = `${employee.first_name} ${employee.last_name}`
		return (<MenuItem key={employee.id} value={employee.id} >
			{fullName}
		</MenuItem>)
  });

  const style = {
	
		width: 'fit-content',
		height: 'fit-content',
		backgroundColor: 'primary.main',
		boxShadow: 24
	};
  
  return (
    <>
				<Box
					sx={{
						backgroundColor: 'primary.main',
						color: 'background.default',
						m: 2
					}}
				>
					<Typography variant="p" align="center">
					
					</Typography>
					<Typography variant="p" align="center">
						Assign Ticket To An Employee
					</Typography>
				</Box>

      <Box sx={{display: 'inline-flex', justifyContent:"center"}}>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="EmployeeLabel">Employees</InputLabel>
        <Select
          labelId="EmployeeLabel"
          label="Emloyee"
          id="Employee"
          value={value}
          onChange={evt => handleChange(evt)}
        >
          <MenuItem value="All"><em>All Employees</em></MenuItem>
          {employeeList}
        </Select>
      </FormControl>
  
					<Button
						sx={{ mx: 2, width: '10%' }}
						color="success"
						size="large"
						variant="contained"
						// onClick={() => (assign())}
					> Assign
					</Button>
          </Box>
				
  </>
  )
}