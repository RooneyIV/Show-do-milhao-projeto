import React, { useContext } from "react";
import { PerguntasContext } from "../context/PerguntasContext";
import "./RemoverPergunta.css"
import Navbar from "./Navbar";

function ListagemPerguntas() {
  const { perguntas, removerPergunta } = useContext(PerguntasContext);

  return (
    <div>
      <Navbar/>
      <div className="container">
        <h1>Lista de Perguntas</h1>
        {perguntas.map((pergunta, index) => (
          <div key={index} className="pergunta-item">
            <p>{pergunta.pergunta}</p>
            <button onClick={() => removerPergunta(index)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListagemPerguntas;
