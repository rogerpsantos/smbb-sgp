import React, { Component } from 'react';
import api from '../../services/api';
import Button from '@material-ui/core/Button';

export default class Agenda extends Component {
    state = {
      content: [],
      agendaInfo: {},
      page: 1,
    };

    componentDidMount() {
      this.loadAgenda();
    }
  
    componentDidUpdate() {
      this.loadAgenda();
    }
  
    loadAgenda = async (page = 0) => {
      const response = await api.get(`/agenda/listar?size=3&page=${page}`);
      const { content, ...agendaInfo } = response.data;
      this.setState({ content: content, agendaInfo, page });
    };

    prevPage = () => {
      const { page } = this.state;
      if (page === 0) return;
      const pageNumber = page - 1;
      this.loadAgenda(pageNumber);
    };
  
    nextPage = () => {
      const { page, agendaInfo } = this.state;
      if (page === agendaInfo.totalPages) return;
      const pageNumber = page + 1;
      this.loadAgenda(pageNumber);
    };

    render() {
      const { content, page, agendaInfo } = this.state;

      return (
      <div> 
        
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
          <button disabled={page === agendaInfo.totalPages - 1} onClick={this.nextPage}>Próxima</button>
        </div>
      </div>
      
      )
    }

}