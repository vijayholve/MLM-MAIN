// name
// plan_type
// price

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
  const handleSubmit =  async() =>{
    
  }
  const handleChange = async (e) =>{
        setFormData({...formData,[e.target.name] : [e.target.value]})
  }

  return (
    <>
      <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data">
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
          value={formData.}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
         
        </div>
        <div className="mb-3">
          <label htmlFor="frontPan" className="form-label">
            Front PAN
          </label>
          <input
            type="file"
            className="form-control"
            id="frontPan"
            name="frontPan"
            onChange={handleChange}
            required
          />
        </div>
        
      </form>
    </>
  );
};

export default PlanCreate;
