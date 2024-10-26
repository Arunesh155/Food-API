import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
const [formData, setFormData] = useState({
username: '',
email: '',
password: '',
confirmPassword: ''
});

const [errors, setErrors] = useState({});
const [apiError, setApiError] = useState('');
const navigate = useNavigate();

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
        newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
        try {
            const { username, email, password } = formData;
            const response = await axios.post('http://localhost:3001/register', { username, email, password });

            // Check if response.data contains an error message indicating email already exists
            if (response.data.error === "Email already exists") {
                setApiError("Email is already registered. Please use a different email.");
                setErrors({});
            } else {
                console.log(response.data);
                navigate('/signin');
            }
        } catch (error) {
            console.error('There was an error creating the account!', error);
            setApiError('Registered mail id already exist.');
            setErrors({});
        }
    } else {
        setErrors(formErrors);
    }
};

return (
    <div className="container2">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-16">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>
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
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        required
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md mb-4">
                    Sign Up
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/signin')}
                    className="w-full bg-gray-500 text-white p-2 rounded-md"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
);
};

export default SignUp;