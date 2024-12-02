import React from 'react';
import ReactDOM from 'react-dom/client'; // Atualização aqui
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Criando o root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
