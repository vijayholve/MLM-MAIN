import  { useState } from 'react';
import axios from 'axios';

const CreateKyc = () => {
    // const [frontAadhar, setFrontAadhar] = useState(null);
    // const [backAadhar, setBackAadhar] = useState(null);
    // const [frontPan, setFrontPan] = useState(null);
    // const [backPan, setBackPan] = useState(null);
    const [formData, setFormData] = useState({
        frontAadhar ="",
        backAadhar ="",
        frontPan="",
        backPan="",
        
      });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('front_aadhar_img', frontAadhar);
        formData.append('back_aadhar_img', backAadhar);
        formData.append('front_pan_img', frontPan);
        formData.append('back_pan_img', backPan);

        try {
            const response = await axios.post('http://127.0.0.1:8000/kyc/create-kyc', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('KYC Submitted Successfully');
        } catch (error) {
            console.log(error.response);
            alert('Error submitting KYC');
        }
    };

    return (
        <div>
            <h2>Create KYC</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => setFrontAadhar(e.target.files[0])} required />
                <input type="file" onChange={(e) => setBackAadhar(e.target.files[0])} required />
                <input type="file" onChange={(e) => setFrontPan(e.target.files[0])} required />
                <input type="file" onChange={(e) => setBackPan(e.target.files[0])} required />
             
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateKyc;
