import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar   from '@mui/material/Snackbar';

const CreateUser = () => {
  const [submitblock, setsubmitblock] = useState(false);
  const [openmessage,setopenmessage] = useState(false);
  const [formData, setFormData] = useState({
    sponsor_code: "",
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
      const response = await axios.post(
        "http://127.0.0.1:8000/api/mlm-users/",
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
    <>
      <form method="POST" onSubmit={handleSubmit}>
        <h3 className="text-bold">User Details</h3>
        <div className="row form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="validationDefaultSponsor_code">Sponsor Code</label>
            <div className="input-group">
              {/* Sponsor Radio Buttons */}
              <div className="form-check">
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
            {/* Sponsor Code Input */}
            <div className="col-md-6 input-group-prepend">
              <span className="input-group-text" id="inputGroupPrepend2">
                Code
              </span>
            </div>
            <input
              disabled={!issponcer} // Disable if not a sponsor
              type="text"
              className="form-control"
              id="validationDefaultSponsor_code"
              placeholder="Sponsor Code"
              name="sponsor_code"
              onChange={handleChange}
              value={formData.sponsor_code}
              aria-describedby="inputGroupPrepend2"
            />
            {error.sponsor_code && (
              <div className="text-danger">{error.sponsor_code}</div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="validationDefaultUsername">Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend2">
                  @
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                id="validationDefaultUsername"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                value={formData.username}
                aria-describedby="inputGroupPrepend2"
                required
              />
            </div>
            {error.username && (
              <div className="text-danger">{error.username}</div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="validationDefault02">Email</label>
            <input
              type="text"
              className="form-control"
              id="validationDefault02"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            {error.email && <div className="text-danger">{error.email}</div>}
          </div>
        </div>

        <div className="row form-row">
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault04">Password</label>
            <input
              type="password"
              className="form-control"
              id="validationDefault04"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            {error.password && (
              <div className="text-danger">{error.password}</div>
            )}
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="validationDefault05">Password Confirmation</label>
            <input
              type="password"
              className="form-control"
              id="validationDefault05"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              onChange={handleChange}
              value={formData.passwordConfirmation}
              required
            />
            {error.passwordConfirmation && (
              <div className="text-danger">{error.passwordConfirmation[0]}</div>
            )}
          </div>
        </div>

        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="invalidCheck2"
              required
            />
            <label className="form-check-label" htmlFor="invalidCheck2">
              Agree to terms and conditions
            </label>
          </div>
        </div>

        <button
          disabled={submitblock}
          className="btn btn-primary"
          type="submit"
        >
          Submit Form
        </button>

        {message.success && (
          <>
      
          <Snackbar
              open={openmessage}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
              >
                {message.success}
              </Alert>
            </Snackbar>
                  </>

        )}

        {message.failure && (
          <Stack sx={{ width: "40%" }} spacing={2}>
            {message.failure}
            {Object.keys(error).map((key) => (
              <Alert key={error.id} variant="filled" severity="error">
                {Array.isArray(error[key]) ? error[key][0] : error[key]}
              </Alert>
            ))}
          </Stack>
        )}
      </form>
    </>
  );
};

export default CreateUser;
