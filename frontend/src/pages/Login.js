import React, { useState, useContext } from 'react';
import { login } from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState(""); 
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); 
        try {
            const data = await login(formData);
            if (data.token) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                navigate('/dashboard');
            } else {
                setErrorMessage("Login failed. Please try again.");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Login error. Please check your credentials.");
            }
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#5c1d3b] pb-10">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 bg-[#f8bedd] rounded-lg shadow-lg"
            >
                <h2 className="mb-4 text-3xl font-bold text-center text-[#5c54cd]">Log In</h2>
                <p className="mb-8 text-center text-[#626de7]">Welcome back! Please log in to your account.</p>

                {errorMessage && (
                    <p className="mb-4 text-center text-red-500">{errorMessage}</p>
                )}

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 mb-4 bg-[#eeeeee] rounded focus:outline-none text-[#000000]"
                    required
                />
                <div className="relative mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full px-4 py-3 bg-[#eeeeee] rounded focus:outline-none text-[#000000]"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 hover:text-[#5c54cd]"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-3 font-semibold text-white bg-[#5c54cd] rounded-lg hover:bg-[#857fd7] focus:outline-none transition-all duration-200"
                >
                    Log In
                </button>

                <div className="mt-4 text-center text-base text-[#626de7]">
                    Don't have an account?{" "}
                    <span
                        className="text-[#f35438] cursor-pointer hover:underline"
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Login;
