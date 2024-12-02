import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CadastroPergunta from './components/CadastroPergunta';
import CadastroCliente from './components/CadastroCliente';
import Jogo from './components/Jogo';
import RemoverPergunta from './components/RemoverPergunta';
import RemoverCliente from './components/RemoverCliente';
import { PerguntasProvider } from './context/PerguntasContext';
import { ClientesProvider } from './context/ClientesContext';

function App() {
  return (
    <PerguntasProvider>
      <ClientesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/jogo" />} /> {/* Redireciona para uma rota existente */}
            <Route path="/cadastro-pergunta" element={<CadastroPergunta />} />
            <Route path="/cadastro-cliente" element={<CadastroCliente />} />
            <Route path="/jogo" element={<Jogo />} />
            <Route path="/remover-pergunta" element={<RemoverPergunta />} />
            <Route path="/remover-cliente" element={<RemoverCliente/>} />
          </Routes>
        </Router>
      </ClientesProvider>
    </PerguntasProvider>
  );
}

export default App;
