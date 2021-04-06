import React, { Component } from 'react';
import '../../App.css';

export default class Home extends Component {
  render() {
    return(
      <div>
        <a href="/federal"> <img src="brazil.png" alt="Obrigações Federais"></img> </a>
        <a href="/estadual"> <img src="estados.png" alt="Obrigações Estaduais"></img> </a>
        <a href="/municipal"> <img src="prefeitura.png" alt="Obrigações Municipais"></img> </a>
      </div>
      );
  }
  
}