import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; 

export const signup = async (userData) => {
    console.log("Sending signup request:", userData);
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, userData);
        console.log("Signup response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Signup error:", error);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData);
        console.log("Login response:", response.data);
        return response.data;  
    } catch (error) {
        console.error("Login error:", error);
        throw error; 
    }
};

export const createReferral = async (referralCode, token) => {
    const response = await axios.post(
        `${API_URL}/referral/create`,
        { referralCode },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return response.data;
};

export const trackReferrals = async (token) => {
    const response = await axios.get(`${API_URL}/referral/track`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

