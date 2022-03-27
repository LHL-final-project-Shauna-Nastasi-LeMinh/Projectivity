import axios from "axios";
import React, { useState, useEffect } from "react";

export default function useEmployeesData(employeeId, tickets) {
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    if (employeeId) {
    axios.get(process.env.REACT_APP_BACKEND_URL + `/employees/${employeeId}`, {
     
    })
    .then(res => {
     
      setEmployee({ ...res.data[0]})
    })
    .catch(function (error) {
      console.log(error.message)
      })
    }
  }, [tickets]);


  return employee;
}
