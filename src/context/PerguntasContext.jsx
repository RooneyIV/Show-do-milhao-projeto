import React, { createContext, useState, useEffect } from 'react';

export const PerguntasContext = createContext();

export const PerguntasProvider = ({ children }) => {
  const [perguntas, setPerguntas] = useState(() => {
    const storedPerguntas = localStorage.getItem('perguntas');
    return storedPerguntas ? JSON.parse(storedPerguntas) : [];
  });

  useEffect(() => {
    localStorage.setItem('perguntas', JSON.stringify(perguntas));
  }, [perguntas]);

  const addPergunta = (novaPergunta) => {
    setPerguntas([...perguntas, novaPergunta]);
  };

  const removerPergunta = (indice) => {
    setPerguntas(perguntas.filter((_, i) => i !== indice));
  };

  return (
    <PerguntasContext.Provider value={{ perguntas, addPergunta, removerPergunta }}>
      {children}
    </PerguntasContext.Provider>
  );
};
