import React, {useState} from "react";
import { TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/material";


export default function NewProjectForm() {

  const [projectName, setProjectName] = useState('')
  const [projectDescriprion, setProjectDescription] = useState('')

  return (
    <div>
      <h2>Create New Project</h2>
      <TextField 
        id="outlined-name"
        label="Name"
        
        onChange={(evt) => setProjectName(evt.target.value)}></TextField>
      <br/>
      <TextareaAutosize
        label="Description"
       
        onChange={(evt) => setProjectDescription(evt.target.value)}
      >

      </TextareaAutosize>
    </div>
  )

}