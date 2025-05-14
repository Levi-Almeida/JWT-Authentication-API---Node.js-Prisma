import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validações básicas
    if (!name || !email || !password || !confirmPassword) {
        
      setErrorMessage('Por favor, preencha todos os campos');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não conferem');
      return;
    }
    
    try {
      // Registra o usuário
      await register(name, email, password);
      
      // Faz login com as credenciais criadas
      await login(email, password);
      
      // Redireciona para o perfil
      navigate('/profile');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Erro ao registrar usuário');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Criar Conta</h2>
        
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Confirmar Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua senha"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Registrar
          </button>
        </form>
        
        <div className="auth-links">
          <p>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;