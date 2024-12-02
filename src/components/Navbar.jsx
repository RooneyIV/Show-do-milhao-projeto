import React from "react";
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav class="navbar">
      <a href="/cadastro-pergunta">Cadastro De Perguntas</a>
      <a href="/cadastro-cliente">Cadastro Usuário</a>
      <a href="/Jogo">Show do Milhão</a>
    </nav>
  );
};

export default Navbar;
