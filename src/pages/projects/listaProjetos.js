import React, { Component } from 'react';
import api from '../../services/api';
import Button from '@material-ui/core/Button';

import './styles.css';

export default class Main extends Component {
  state = {
    content: [],
    productInfo: {},
    page: 1,
  };

  // RESPONSAVEL PELA CHAMADA DE COMPONENTS
  componentDidMount() {
    this.loadProducts();
  }

  componentDidUpdate() {
    this.loadProducts();
  }

  loadProducts = async (page = 0) => {
    const response = await api.get(`/listar?page=${page}`);
    const { content, ...productInfo } = response.data;
    this.setState({ content: content, productInfo, page });
  }

  deletarTarefas(id_agenda) {
    if (window.confirm('Tem certeza que deseja remover?')) {
      api.delete(`/deletar/${id_agenda}`);
    }
    
  }

  prevPage = () => {
    const { page } = this.state;
    if (page === 0) return;
    const pageNumber = page - 1;
    this.loadProducts(pageNumber);
  };

  nextPage = () => {
    const { page, productInfo } = this.state;
    if (page === productInfo.totalPages) return;
    const pageNumber = page + 1;
    this.loadProducts(pageNumber);
  };

  render() {
    const { content, page, productInfo } = this.state;
    // window.location.reload();

    return (
      <div className="product-list">

        <div className="actions">

        <Button variant="contained" color='primary' type="submit" href={'/cadastrar'}>Adicionar</Button>

          
        </div>

        {content.map(dados => (
          <article key={dados.id_agenda}>
            <strong>{dados.titulo}</strong>
            <p>{dados.inicio}</p>

            <Button variant="contained" color="secondary" href={`listar/${dados.id_agenda}`}>Detalhes</Button>
            <br/>
            <Button variant="contained" color="secondary" onClick={() => { this.deletarTarefas(dados.id_agenda) }}>Deletar</Button>

          </article>
        ))}

        <div className="actions">
          <button disabled={page === 0} onClick={this.prevPage}>Anterior</button>
          <button disabled={page === productInfo.totalPages - 1} onClick={this.nextPage}>Próxima</button>
        </div>
      </div>
    );
  }
}
