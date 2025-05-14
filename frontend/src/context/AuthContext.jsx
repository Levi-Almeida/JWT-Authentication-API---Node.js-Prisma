import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Verificar se o usuário já está logado (token no localStorage)

        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        

        if (storedUser && token) {
            console.log(storedUser + "  -------------   " + token)

            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setError(null);
            const data = await authService.login(email, password);

            // Salvar token e dados do usuário
            localStorage.setItem('token', data.message);
            console.log("Criando local user - " + data)
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Falha ao fazer login');
            throw err;
        }
    };

    const register = async (name, email, password) => {
        try {
            setError(null);
            const data = await authService.register(name, email, password);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Falha ao registrar usuário');
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

const loadProfile = useCallback(async () => {
  try {
    const data = await authService.getProfile();
    
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (err) {
    setError(err.response?.data?.message || 'Falha ao carregar perfil');
    throw err;
  }
}, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                register,
                logout,
                loadProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export default AuthContext;