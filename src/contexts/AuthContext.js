import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:8080/usuarios/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setCurrentUser(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar informações do usuário', error);
                localStorage.removeItem('token');
            });
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
