import React, { useContext, useState } from 'react';
import { ClientesContext } from '../context/ClientesContext';
import Navbar from './Navbar';
import "./RemoverCliente.css"

function Clientes() {
  const { clientes, setClientes } = useContext(ClientesContext);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleRemoveCliente = (index) => {
    const updatedClientes = clientes.filter((_, i) => i !== index);
    setClientes(updatedClientes);
    setModalMessage('Cliente removido com sucesso!');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
        <Navbar/>
        <div class="container">
        <h1>Clientes Cadastrados</h1>

        <ul>
            {clientes.length > 0 ? (
            clientes.map((cliente, index) => (
                <li key={index}>
                {cliente.nome}
                <button onClick={() => handleRemoveCliente(index)}>Remover</button>
                </li>
            ))
            ) : (
            <p>Nenhum cliente cadastrado.</p>
            )}
        </ul>

        {showModal && (
            <div className="modal">
            <div className="modal-content">
                <h2>{modalMessage}</h2>
                <button onClick={closeModal}>Fechar</button>
            </div> 
            </div>
        )}
        </div>
    </div>
  );
}

export default Clientes;
