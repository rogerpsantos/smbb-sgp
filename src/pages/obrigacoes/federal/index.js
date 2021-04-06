import React from 'react';
import Menu from '../../../components/header/index';

const Federal = () => {
  return (
    <div className="App">
      <Menu/>
      <br/>
      <br/>
      <a href="/federal" className="botao-menu-geral">MANAD</a>
      <a href="/estadual" className="botao-menu-geral">EFD CONTRIBUIÇÕES</a>
      <a href="/municipal" className="botao-menu-geral">SPED CONTÁBIL</a>
      <br/>
    </div>
  );
};

export default Federal;