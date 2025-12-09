import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleRoute = ({ allowedRole }) => {
  const { user, loading } = useAuth();

  // Enquanto carrega
  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  // Se não estiver logado → redireciona
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se a role não bater → manda para o profile
  if (user.role !== allowedRole) {
    return <Navigate to="/profile" replace />;
  }

  // Se estiver logado e tiver a role correta → libera a rota filha
  return <Outlet />;
};

export default RoleRoute;
