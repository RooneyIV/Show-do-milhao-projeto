import React, { useState, useContext } from "react";
import { PerguntasContext } from "../context/PerguntasContext";
import Navbar from "./Navbar";
import "./CadastroPergunta.css";

function CadastroPergunta() {
  const { addPergunta } = useContext(PerguntasContext);
  const [formData, setFormData] = useState({
    pergunta: "",
    alternativas: ["", "", "", ""],
    resposta: "",
    dificuldade: "facil",
  });
  
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAlternativaChange = (index, value) => {
    const novasAlternativas = [...formData.alternativas];
    novasAlternativas[index] = value;
    setFormData({ ...formData, alternativas: novasAlternativas });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // verifica os campos se estão preenchidos
    if (
      formData.pergunta.trim() === "" ||
      formData.alternativas.some((alt) => alt.trim() === "") ||
      formData.resposta.trim() === ""
    ) {
      setModalMessage("Preencha todos os campos!");
      setShowModal(true);
      return; // impede o cadastro caso os campos nao estejam preenchidos
    }

    // cadastro da pergunta
    addPergunta(formData);
    setModalMessage("Pergunta cadastrada com sucesso!");
    setShowModal(true);
    setFormData({
      pergunta: "",
      alternativas: ["", "", "", ""],
      resposta: "",
      dificuldade: "facil",
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <h1>Cadastro de Perguntas</h1>
          <input
            className="container-pergunta"
            name="pergunta"
            value={formData.pergunta}
            onChange={handleChange}
            placeholder="Pergunta"
          />
          {formData.alternativas.map((alt, index) => (
            <div key={index} className="alternativa-box">
              <input
                className="alternativas-container"
                value={alt}
                placeholder={`Alternativa ${index + 1}`}
                onChange={(e) => handleAlternativaChange(index, e.target.value)}
              />
            </div>
          ))}
          <input
            className="input-quest"
            name="resposta"
            value={formData.resposta}
            onChange={handleChange}
            placeholder="Resposta correta"
          />
          <select
            name="dificuldade"
            value={formData.dificuldade}
            onChange={handleChange}
          >
            <option value="facil">Fácil</option>
            <option value="intermediario">Intermediário</option>
            <option value="dificil">Difícil</option>
          </select>
          <button type="submit">Cadastrar Pergunta</button>
        </div>
      </form>

      {/* Modal de confirmação ou erro */}
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

export default CadastroPergunta;
