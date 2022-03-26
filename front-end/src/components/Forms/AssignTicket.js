import React, {useEffect} from "react";

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";


export default function AssignTicket(props) {

  const {anchorEl, dialogOpen, handleClose, open} = props

  
  
  return (
    <FormControl sx={{ m: 1, minWidth: 300 }}>
    <InputLabel id="EmployeeLabel">Employees</InputLabel>
    <Select
      labelId="EmployeeLabel"
      label="Emloyee"
      id="Employee"
      // value={employee}
      // onChange={e => {}}
    >
      <MenuItem value="All"><em>All Employees</em></MenuItem>
      {/* {employeeList} */}
    </Select>
  </FormControl>
  )
}