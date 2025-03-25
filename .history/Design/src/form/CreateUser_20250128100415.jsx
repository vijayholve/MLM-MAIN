import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
const CreateUser = () => {
  const [submitblock, setsubmitblock] = useState(false);
  const [openmessage, setopenmessage] = useState(false);
  const 
  const [formData, setFormData] = useState({
    sponsor_code: "",
    position: "",
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [message, setmessage] = useState({
    success: "",
    failure: "",
  });
  const [issponcer, setissponcer] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSponsorChange = (e) => {
    setissponcer(e.target.value === "no"); // If "no" is selected, sponsor_code input is enabled
  };

  const handleSubmit = async (e) => {
    setsubmitblock(true);
    e.preventDefault();
    try {
      console.log("data is ",formData)
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register/",
        formData
      );
      setmessage({
        success: "User Created Successfully",
        failure: "",
      });
      setopenmessage(true);
       
      setError({});
      setsubmitblock(false);
    } catch (error) {
      console.log(error);
      console.error("Error:", error.response?.data || error.message);

      // Set error messages correctly
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError({ general: "Something went wrong. Please try again." });
      }

      setmessage({
        success: "",
        failure: "User is not Created",
      });

      setsubmitblock(false);
    }
  };
  const handleClose = () => {
    setopenmessage(false); // Close Snackbar
  };

  return (
    <div className="container py-5">
      <form method="POST" onSubmit={handleSubmit} className="p-4 shadow-sm bg-white rounded">
        <h2 className="text-center text-primary mb-4">User Registration</h2>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Sponsor Code</label>
            <div className="d-flex align-items-center mb-2">
              <div className="form-check me-3">
                <input
                  type="radio"
                  name="sponsorSelection"
                  value="no"
                  onChange={handleSponsorChange}
                  className="form-check-input"
                  id="sponsorYes"
                />
                <label className="form-check-label" htmlFor="sponsorYes">
                  I am a sponsor
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  name="sponsorSelection"
                  value="yes"
                  onChange={handleSponsorChange}
                  className="form-check-input"
                  id="sponsorNo"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="sponsorNo">
                  I am not a sponsor
                </label>
              </div>
            </div>
            <input
              disabled={!issponcer}
              type="text"
              className="form-control"
              placeholder="Sponsor Code"
              name="sponsor_code"
              onChange={handleChange}
              value={formData.sponsor_code}
            />
            {error.sponsor_code && <small className="text-danger">{error.sponsor_code}</small>}
          </div>
          <div className="col-md-6 mb-3">
            <InputLabel>Position</InputLabel>
            <Select
              name="position"
              value={formData.position}
              onChange={handleChange}
              fullWidth
              className="form-control"
            >
              <MenuItem value="left">Left</MenuItem>
              <MenuItem value="right">Right</MenuItem>
            </Select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={formData.username}
            />
            {error.username && <small className="text-danger">{error.username}</small>}
          </div>
          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            {error.email && <small className="text-danger">{error.email}</small>}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
            />
            {error.password && <small className="text-danger">{error.password}</small>}
          </div>
          <div className="col-md-6 mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="passwordConfirmation"
              onChange={handleChange}
              value={formData.passwordConfirmation}
            />
            {error.passwordConfirmation && (
              <small className="text-danger">{error.passwordConfirmation}</small>
            )}
          </div>
        </div>

        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" id="termsCheck" required />
          <label className="form-check-label" htmlFor="termsCheck">
            Agree to terms and conditions
          </label>
        </div>

        <div className="text-center">
          <Button
            type="submit"
            disabled={submitblock}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>

        {message.success && (
          <Snackbar open={openmessage} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="success" onClose={handleClose}>
              {message.success}
            </Alert>
          </Snackbar>
        )}

        {message.failure && (
          <Stack spacing={2} className="mt-3">
            {message.failure}
            {Object.keys(error).map((key) => (
              <Alert severity="error" key={key}>
                {Array.isArray(error[key]) ? error[key][0] : error[key]}
              </Alert>
            ))}
          </Stack>
        )}
      </form>
    </div>
  );
};

export default CreateUser;





