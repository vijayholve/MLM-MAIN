import { useState } from "react";
import axios from "axios";

const CreateKyc = () => {
  // const [frontAadhar, setFrontAadhar] = useState(null);
  // const [backAadhar, setBackAadhar] = useState(null);
  // const [frontPan, setFrontPan] = useState(null);
  // const [backPan, setBackPan] = useState(null);
  const [formData, setFormData] = useState({
    frontAadhar: "",
    backAadhar: "",
    frontPan: "",
    backPan: "",
  });
  const [submitblock, setsubmitblock] = useState(false);
  const [openmessage, setopenmessage] = useState(false);
  const [message, setmessage] = useState({
    success: "",
    failure: "",
  });
  const [message, setmessage] = useState({
    success: "",
    failure: "",
  });
  const [error, setError] = useState({});
  const [issponcer, setissponcer] = useState(false);
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  }
  const handleSubmit = async (e) => {
    setsubmitblock(true)
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/kyc/create-kyc",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setError()
    } catch (error) {
      console.log(error.response);
      alert("Error submitting KYC");
    }
  };

  return (
    <div>
      <h2>Create KYC</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handelChange} 
          value={formData.frontAadhar}
          required 
        />
        <input
          type="file"
          onChange={handelChange} 
          value={formData.backAadhar}
          required
        />
        <input
          type="file"
          onChange={handelChange} 
          value={formData.frontPan}
          required
        />
        <input
          type="file"
          onChange={(e) => setBackPan(e.target.files[0])} 
          value={formData.backPan}
          required
        />

        <button type="submit" >Submit</button>
      </form>
    </div>
  );
};

export default CreateKyc;
