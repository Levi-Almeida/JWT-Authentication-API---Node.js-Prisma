import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Auth App
        </Link>

        <div className="navbar-menu">
          {user ? (
            <>
              <button
                className="navbar-link navbar-button"
                onClick={() => {
                  if (user.role === "aluno") navigate("/alunos");
                  else if (user.role === "professor") navigate("/professores");
                  else navigate("/profile"); // fallback (opcional)
                }}
              >
                Perfil
              </button>
              <button onClick={handleLogout} className="navbar-button">
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link">
                Registrar
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;