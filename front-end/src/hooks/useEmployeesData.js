import axios from "axios";
import React, { useState, useEffect } from "react";

export default function useEmployeesData(employeeId) {
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + `/employees/${employeeId}`, {
     
    })
    .then(res => {
     
      setEmployee({ ...res.data[0]})
    })
    .catch(function (error) {
      console.log(error.message)
      })
  }, []);

  
  return employee;
}
