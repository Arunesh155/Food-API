import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

const SignIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
        try {
            const result = await axios.post('http://localhost:3001/signin', { email, password });
            console.log(result);
            if (result.data === "Success") {
                navigate("/");
            } else {
                setError(result.data); // Set error message based on the response
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred while signing in");
        }
    };

    return (
        <div className="container1">
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-opacity-50">
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;