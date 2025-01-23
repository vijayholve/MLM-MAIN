// name
// plan_type
// price
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../app";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
const PlanCreate = () => {
  const { baseURL } = useContext(UserContext);
  const [formData,setFormData] = useState({
    name : '',
plan_type: '',
    price: '',
  });
  const handleSubmit =  async(e) =>{
    e.preventDefault();
    console.log(formData)

  }
  const handleChange = async (e) =>{
        setFormData({...formData,[e.target.name] : [e.target.value]})
  }

  return (
    <>
      <form method="POST" onSubmit={handleSubmit} >
        <h3 className="text-bold">Create Plan</h3>
        <div className="mb-3">
          <label htmlFor="frontAadhar" className="form-label">
            Plan Name
          </label>
          <input
            type="text"
            className="form-control"
            id="frontAadhar"
            name="name"
            onChange={handleChange}
            required
          />
         
        </div>
        <div className="mb-3">
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.plan_type}
          label="Age"
          onChange={handleChange}
        >
            
          <MenuItem value={"one time"}>One Time</MenuItem>
          <MenuItem value={"recurring"}>Recurring</MenuItem>
        </Select>
         
        </div>
        <div className="mb-3">
          <label htmlFor="frontPan" className="form-label">
            Plan Price
          </label>
          <input
            type="file"
            className="form-control"
            id="frontPan"
            name="price"
            onChange={handleChange}
            required
          />
        </div>
        <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack>
        
      </form>
    </>
  );
};

export default PlanCreate;
