import React from "react";
import { Alert, Snackbar, Stack } from "@mui/material";

const CreateKyc = ({
  handleSubmit,
  handleChange,
  error,
  submitblock,
  message,
  openMessage,
  handleClose,
}) => {
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
    </div>
  );
};

export default CreateKyc;
