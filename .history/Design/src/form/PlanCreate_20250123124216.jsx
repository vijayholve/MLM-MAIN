// name
// plan_type
// price
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../app";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
const PlanCreate = () => {
  const { baseURL } = useContext(UserContext);
  const [blocksubmit,setblocksubmit] =useState(false);
  const [formData, setFormData] = useState({
    name: "",
    plan_type: "",
    price: "",
  });
  const [errors,seterrors] =useState("")
  const [success,setsuccess] =useState("")
  const handleSubmit = async (e) => {
    blocksubmit(true)
    e.preventDefault();
    try{
        
        console.log(formData);
        const response= await axios.post(`${baseURL}/plan/plan-operate`)
        setsuccess(response.success.message)
        blocksubmit(false)


    }catch(error){
        blocksubmit(false)
        seterrors(error)
    }
  };
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  return (
    <>
      <form method="POST" onSubmit={handleSubmit}>
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
          <InputLabel id="demo-simple-select-label">Plan Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="plan_type"
            value={formData.plan_type}
            label="plan_type"
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
            type="number"
            className="form-control"
            id="frontPan"
            name="price"
            onChange={handleChange}
            required
          />
        </div>
        <Stack direction="row" spacing={2}>
          <Button disabled={blocksubmit} type="submit" variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Stack>
        {errors && (
  <Alert variant="filled" severity="error">
    {errors}
  </Alert>
)}

        {success && (
          <Stack sx={{ width: "40%" }} spacing={2}>
            <Alert variant="filled" severity="error">
              {success}
            </Alert>
            {Object.keys(error).map((key) => (
              <Alert key={key} variant="filled" severity="error">
                {Array.isArray(error[key]) ? error[key][0] : error[key]}
              </Alert>
            ))}
          </Stack>
        )}
      </form>
    </>
  );
};

export default PlanCreate;
