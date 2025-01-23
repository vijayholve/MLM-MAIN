// name
// plan_type
// price

import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../app";
import axios from "axios";
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
          <label htmlFor="backAadhar" className="form-label">
            
          </label>
          <input
            type="file"
            className="form-control"
            id="backAadhar"
            name="backAadhar"
            onChange={handleChange}
            required
          />
         
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
