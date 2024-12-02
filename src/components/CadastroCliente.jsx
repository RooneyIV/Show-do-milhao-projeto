import React, { useState, useContext } from 'react';
import { ClientesContext } from '../context/ClientesContext';
import Navbar from "./Navbar";
import "./CadastroCliente.css";

function CadastroCliente() {
  const { addCliente } = useContext(ClientesContext);
  const [nome, setNome] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nome.trim() === '') {
      // exibe o modal de erro se o campo nome estiver vazio
      setModalMessage("Preencha o campo com o nome do usuário");
      setShowModal(true);
      return; // impede o cadastro
    }

    // cadastro do cliente
    addCliente({ nome, saldo: 0 });
    setModalMessage("Usuário cadastrado com sucesso!");
    setShowModal(true);
    setNome('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className='input-cliente'>
          <h1>Cadastrar Usuários</h1>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do Usuário"
          />
          <button type="submit">Cadastrar Usuário</button>
        </div>
      </form>

      {/* modal de confirmação ou erro */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalMessage}</h2>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroCliente;
