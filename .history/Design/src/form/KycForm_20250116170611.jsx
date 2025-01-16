import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { UserContext } from "../App";
const CreateKyc = () => {
  const [formData, setFormData] = useState({
    frontAadhar: null,
    backAadhar: null,
    frontPan: null,
    backPan: null,
    username : null
  });
  const [submitblock, setSubmitBlock] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState({
    success: "",
    failure: "",
  });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitBlock(true);

    const formDataSend = new FormData();
    formDataSend.append("front_aadhar_img", formData.frontAadhar); // File input names should match the backend field names
    formDataSend.append("back_aadhar_img", formData.backAadhar);
    formDataSend.append("front_pan_img", formData.frontPan);
    formDataSend.append("back_pan_img", formData.backPan);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/kyc/create-kyc",
        formDataSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
        },
        }
      );
      setMessage({
        success: "KYC Created Successfully",
        failure: "",
      });
      setOpenMessage(true);
      setSubmitBlock(false);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data || { general: "Something went wrong." });
      setMessage({
        success: "",
        failure: "KYC not created",
      });
      setSubmitBlock(false);
    }
  };

  return (
    <>
      <form method="POST" onSubmit={handleSubmit} encType="multipart/form-data" >
        <h3 className="text-bold">Create KYC</h3>

        <div className="mb-3">
          <label htmlFor="frontAadhar" className="form-label">
            Front Aadhar
          </label>
          <input
            type="file"
            className="form-control"
            id="frontAadhar"
            name="frontAadhar"
            onChange={handleChange}
            required
          />
          {error.frontAadhar && (
            <div className="text-danger">{error.frontAadhar}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="backAadhar" className="form-label">
            Back Aadhar
          </label>
          <input
            type="file"
            className="form-control"
            id="backAadhar"
            name="backAadhar"
            onChange={handleChange}
            required
          />
          {error.backAadhar && (
            <div className="text-danger">{error.backAadhar}</div>
          )}
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
          {error.frontPan && (
            <div className="text-danger">{error.frontPan}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="backPan" className="form-label">
            Back PAN
          </label>
          <input
            type="file"
            className="form-control"
            id="backPan"
            name="backPan"
            onChange={handleChange}
            required
          />
          {error.backPan && <div className="text-danger">{error.backPan}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitblock}
        >
          {submitblock ? "Submitting..." : "Submit"}
        </button>

        {message.success && (
          <Snackbar
            open={openMessage}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {message.success}
            </Alert>
          </Snackbar>
        )}

        {message.failure && (
          <Stack sx={{ width: "40%" }} spacing={2}>
            <Alert variant="filled" severity="error">
              {message.failure}
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

export default CreateKyc;
