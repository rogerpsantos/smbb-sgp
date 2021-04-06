import React, { Component } from 'react';

export default class Etapas extends Component {
  state = {
    content: [],
    projetos: {},
    page: 1,
  };

  componentDidMount() {
    this.loadEtapas();
  }  



}