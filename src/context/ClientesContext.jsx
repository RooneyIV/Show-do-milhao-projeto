import React, { createContext, useState, useEffect } from 'react';

export const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState(() => {
    const storedClientes = localStorage.getItem('clientes');
    return storedClientes ? JSON.parse(storedClientes) : [];
  });

  useEffect(() => {
    localStorage.setItem('clientes', JSON.stringify(clientes));
  }, [clientes]);

  const addCliente = (novoCliente) => {
    setClientes([...clientes, novoCliente]);
  };

  return (
    <ClientesContext.Provider value={{ clientes, addCliente, setClientes }}>
      {children}
    </ClientesContext.Provider>
  );
};
