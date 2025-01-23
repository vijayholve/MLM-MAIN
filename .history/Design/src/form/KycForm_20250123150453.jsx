import { useContext, useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import { baseURL, UserContext } from "../App";
const CreateKyc = () => {
  const {username}= useContext(UserContext)
  const [formData, setFormData] = useState({
    frontAadhar: null,
    backAadhar: null,
    frontPan: null,
    backPan: null,
    username : username
  });
  const [submitblock, setSubmitBlock] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState({
    success: "",
    failure: "",
  });
  const [error, setError] = useState({});

  function handleClose(){
    setOpenMessage(false); // Close Snackbar
  };
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
    formDataSend.append("username", username);
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/kyc/operate-kyc",
        formDataSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Add the token here
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
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError({ general: "An unexpected error occurred." });
      }
      setMessage({
        success: "",
        failure: "KYC not created",
      });
      setSubmitBlock(false);
    }
    
  }
  return (
    <div className="container py-5">
      <form
        method="POST"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="p-4 border rounded shadow-lg bg-white"
      >
        <h3 className="text-center text-primary mb-4">Create KYC</h3>

        <div className="row gy-3">
          {/* Front Aadhar */}
          <div className="col-md-6">
            <label htmlFor="frontAadhar" className="form-label fw-bold">
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
              <div className="text-danger small mt-1">{error.frontAadhar}</div>
            )}
            {
              formData.frontAadhar && 
              <img src={${baseURL}formData.frontAadhar} alt={`${baseURL}${formData.frontAadhar}`} />
            }
          </div>

          {/* Back Aadhar */}
          <div className="col-md-6">
            <label htmlFor="backAadhar" className="form-label fw-bold">
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
              <div className="text-danger small mt-1">{error.backAadhar}</div>
            )}
          </div>

          {/* Front PAN */}
          <div className="col-md-6">
            <label htmlFor="frontPan" className="form-label fw-bold">
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
              <div className="text-danger small mt-1">{error.frontPan}</div>
            )}
          </div>

          {/* Back PAN */}
          <div className="col-md-6">
            <label htmlFor="backPan" className="form-label fw-bold">
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
            {error.backPan && (
              <div className="text-danger small mt-1">{error.backPan}</div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className={`btn btn-primary px-5 ${submitblock ? "disabled" : ""}`}
          >
            {submitblock ? "Submitting..." : "Submit"}
          </button>
        </div>

        {/* Success Message */}
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

        {/* General Error */}
        {error.general && (
          <Alert variant="filled" severity="error" className="mt-3">
            {error.general}
          </Alert>
        )}

        {/* Failure Messages */}
        {message.failure && (
          <Stack sx={{ width: "100%" }} spacing={2} className="mt-3">
            {Object.keys(error).map((key) => (
              <Alert key={key} variant="filled" severity="error">
                {Array.isArray(error[key]) ? error[key][0] : error[key]}
              </Alert>
            ))}
          </Stack>
        )}
      </form>
    </div>
  );
};

export default CreateKyc;