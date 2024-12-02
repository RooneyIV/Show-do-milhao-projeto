import React, { useContext, useState } from 'react';
import { PerguntasContext } from '../context/PerguntasContext';
import { ClientesContext } from '../context/ClientesContext';
import Navbar from "./Navbar";
import "./Jogo.css";

const tabelaPontuacao = [
  { acertar: 1000, parar: 0, errar: 0 },
  { acertar: 2000, parar: 1000, errar: 500 },
  { acertar: 3000, parar: 2000, errar: 1000 },
  { acertar: 4000, parar: 3000, errar: 1500 },
  { acertar: 5000, parar: 4000, errar: 2000 },
  { acertar: 10000, parar: 5000, errar: 2500 },
  { acertar: 20000, parar: 10000, errar: 5000 },
  { acertar: 30000, parar: 20000, errar: 10000 },
  { acertar: 40000, parar: 30000, errar: 15000 },
  { acertar: 50000, parar: 40000, errar: 20000 },
  { acertar: 100000, parar: 50000, errar: 25000 },
  { acertar: 200000, parar: 100000, errar: 50000 },
  { acertar: 300000, parar: 200000, errar: 100000 },
  { acertar: 400000, parar: 300000, errar: 150000 },
  { acertar: 500000, parar: 400000, errar: 200000 },
  { acertar: 1000000, parar: 500000, errar: 0 },
];

function Jogo() {
  const { perguntas } = useContext(PerguntasContext);
  const { clientes } = useContext(ClientesContext);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [perguntasEmbaralhadas, setPerguntasEmbaralhadas] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [jogoAtivo, setJogoAtivo] = useState(false);
  const [respostaClicada, setRespostaClicada] = useState(false);
  const [skipCount, setSkipCount] = useState(0); // Contador para os pulos

  const embaralharPerguntas = (perguntas) => {
    const perguntasCopy = [...perguntas];
    for (let i = perguntasCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [perguntasCopy[i], perguntasCopy[j]] = [perguntasCopy[j], perguntasCopy[i]];
    }
    return perguntasCopy;
  };

  const handleStartGame = () => {
    if (!clienteSelecionado) {
      setModalMessage("Por favor, selecione um cliente antes de iniciar o jogo.");
      setShowModal(true);
      return;
    }

    if (perguntas.length === 0) {
      setModalMessage("Pelo menos uma pergunta precisa ser cadastrada!");
      setShowModal(true);
      return;
    }

    setPerguntasEmbaralhadas(embaralharPerguntas(perguntas));
    setPerguntaAtual(0);
    setPontuacao(0);
    setSkipCount(0); // Reseta o contador de pulos ao iniciar
    setShowModal(false);
    setJogoAtivo(true);
  };

  const handleAnswer = (resposta) => {
    if (respostaClicada) return;

    setRespostaClicada(true);
    let novaPontuacao = pontuacao;

    if (resposta === perguntasEmbaralhadas[perguntaAtual].resposta) {
      novaPontuacao = tabelaPontuacao[perguntaAtual].acertar;
      setPontuacao(novaPontuacao);
    } else {
      const pontuacaoErro = tabelaPontuacao[perguntaAtual]?.errar || 0;
      finalizarJogo(pontuacaoErro, "erro");
      return;
    }

    if (perguntaAtual + 1 < perguntasEmbaralhadas.length) {
      setTimeout(() => {
        setPerguntaAtual(perguntaAtual + 1);
        setRespostaClicada(false);
      }, 1000);
    } else {
      finalizarJogo(novaPontuacao, "conclusão");
    }
  };

  const handleSkip = () => {
    if (skipCount >= 3) {
      setModalMessage("Você já usou todas as ajudas.");
      setShowModal(true);
      return;
    }

    setSkipCount(skipCount + 1);

    if (perguntaAtual + 1 < perguntasEmbaralhadas.length) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      finalizarJogo();
    }
  };

  const finalizarJogo = (pontuacaoFinal = pontuacao, motivo = "conclusão") => {
    let mensagemFinal;

    switch (motivo) {
      case "erro":
        mensagemFinal = `Você errou! Seu saldo final é: R$ ${pontuacaoFinal}`;
        break;
      case "parar":
        mensagemFinal = `Você decidiu parar! Seu saldo final é: R$ ${pontuacaoFinal}`;
        break;
      case "conclusão":
      default:
        mensagemFinal = `Fim de jogo! Seu saldo final é: R$ ${pontuacaoFinal}`;
    }

    setModalMessage(mensagemFinal);
    setShowModal(true);
    setJogoAtivo(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleStop = () => {
    const pontuacaoParar = tabelaPontuacao[perguntaAtual]?.parar || pontuacao;
    finalizarJogo(pontuacaoParar, "parar");
  };

  return (
    <div>
      <Navbar />

      {!jogoAtivo && (
        <div className='container-quiz'>
          <h1>Bem-vindo ao Show do Milhão!</h1>
          <p>Qual usuário deseja utilizar?</p>
          <select
            onChange={(e) => setClienteSelecionado(e.target.value)}
            value={clienteSelecionado || ""}
          >
            <option value="" disabled>Selecione um cliente</option>
            {clientes.map((cliente, index) => (
              <option key={index} value={cliente.nome}>{cliente.nome}</option>
            ))}
          </select>
          <button onClick={handleStartGame}>Iniciar Jogo</button>
        </div>
      )}

      {jogoAtivo && perguntasEmbaralhadas[perguntaAtual] && (
        <div className='alternativas-perg'>
          <h2>{perguntasEmbaralhadas[perguntaAtual].pergunta}</h2>
          {perguntasEmbaralhadas[perguntaAtual].alternativas.map((alt, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(alt)}
              className={respostaClicada && alt === perguntasEmbaralhadas[perguntaAtual].resposta ? 'correta' : ''}
            >
              {alt}
            </button>
          ))}
          <button onClick={handleSkip} className="skip-button">Pular</button>
          <button onClick={handleStop} className="finalizar-button">Parar</button>
        </div>
      )}

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

export default Jogo;
