import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import {AlunoArea} from './components/AlunoArea';
import {ProfessorArea} from './components/ProfessorArea';
import Busca from './components/Busca';
import './styles.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              {/* Rota inicial redireciona para o perfil se logado, ou para login se não */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Rotas públicas */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/busca" element={<Busca />} />

              {/* Rotas protegidas (apenas autenticação) */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
              </Route>

              {/* Rotas exclusivas por role */}
              <Route element={<RoleRoute allowedRole="aluno" />}>
                <Route path="/alunos" element={<AlunoArea />} />
              </Route>

              <Route element={<RoleRoute allowedRole="professor" />}>
                <Route path="/professores" element={<ProfessorArea />} />
              </Route>

              {/* Rota fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />

              
              
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
