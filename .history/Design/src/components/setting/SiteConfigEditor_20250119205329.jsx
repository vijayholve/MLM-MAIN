import axios from 'axios';
import { useState } from 'react';

function SiteConfigEditor() {
    const [formData, setFormData] = useState({}); // Form input state
    const [errorMessage, setErrorMessage] = useState(null); // Error message state
    const [successMessage, setSuccessMessage] = useState(null); // Success message state

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://127.0.0.1:8000/siteconfig/main/', formData);
            setSuccessMessage(response.data.message); // Show success message
            setErrorMessage(null); // Clear any previous errors
        } catch (error) {
            if (error.response) {
                // Handle server-side validation errors
                setErrorMessage(error.response.data.error || "Something went wrong");
                console.error("Validation Details: ", error.response.data.details || {});
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
            setSuccessMessage(null); // Clear any previous success messages
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Site Config Editor</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Navbar Title:</label>
                    <input
                        type="text"
                        name="navbar_title"
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Primary Color:</label>
                    <input
                        type="text"
                        name="primary_color"
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Update Config</button>
            </form>

            {/* Display success or error messages */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default SiteConfigEditor;
