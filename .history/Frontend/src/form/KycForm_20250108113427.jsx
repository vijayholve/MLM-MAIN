import  { useState } from 'react';
import axios from 'axios';

const CreateKyc = () => {
    const [status, setStatus] = useState('');
    const [frontAadhar, setFrontAadhar] = useState(null);
    const [backAadhar, setBackAadhar] = useState(null);
    const [frontPan, setFrontPan] = useState(null);
    const [backPan, setBackPan] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('status', status);
        formData.append('front_aadhar_img', frontAadhar);
        formData.append('back_aadhar_img', backAadhar);
        formData.append('front_pan_img', frontPan);
        formData.append('back_pan_img', backPan);

        try {
            const response = await axios.post('kyc/', formData, {
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
                <select onChange={(e) => setStatus(e.target.value)} value={status} required>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateKyc;
