import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Se ainda estiver carregando, mostra mensagem de carregamento
  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  // Se não houver usuário autenticado, redireciona para a página de login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se o usuário estiver autenticado, renderiza a rota filha
  return <Outlet />;
};

export default ProtectedRoute;