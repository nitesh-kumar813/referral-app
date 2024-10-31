import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        setToken('');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
