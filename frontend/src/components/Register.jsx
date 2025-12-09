import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('aluno');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não conferem');
      return;
    }

    try {
      await register(name, email, password, role);
      await login(email, password);
      if (role === "aluno") {
        navigate('/alunos');
      } else if (role === "professor") {
        navigate('/professores');
      }
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

          {/* Nome */}
          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {/* Senha */}
          <div className="form-group">
            <label>Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {/* Confirmar senha */}
          <div className="form-group">
            <label>Confirmar Senha</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          {/* Role Select */}
          <div className="form-group">
            <label>Tipo de Conta</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Registrar</button>
        </form>

        <div className="auth-links">
          <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;