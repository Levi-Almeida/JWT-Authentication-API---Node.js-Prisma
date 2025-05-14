import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, loadProfile, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        await loadProfile();
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar perfil');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [loadProfile]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Carregando perfil...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Perfil do Usuário</h2>
        
        {user && (
          <div className="profile-info">
            <div className="info-group">
              <label>Nome:</label>
              <p>{user.name}</p>
            </div>
            
            <div className="info-group">
              <label>Email:</label>
              <p>{user.email}</p>
            </div>
            
            {user.createdAt && (
              <div className="info-group">
                <label>Membro desde:</label>
                <p>{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="profile-actions">
          <button onClick={handleLogout} className="btn btn-danger">
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;