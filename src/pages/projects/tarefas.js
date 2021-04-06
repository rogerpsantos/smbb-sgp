import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import api from '../../services/api';

export default class Processos extends Component {
  state = {
      content: [],
      projetos: {},
      page: 1,
    };
  

  componentDidMount() {
    this.loadEtapas();
  }

  loadEtapas = async (page = 0) => {
    const response = await api.get(`/tarefa/listar?page=${page}`);
    const {content, processos, ...etapas } = response.data;
    this.setState({ content: content, processos, etapas, page});
  }


  render() {

    const { content } = this.state;

    return (
      <div>
        {content.map(taref => (
          <div key={taref.id_tarefa} className="tarefa-list">
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand" aria-controls="additional-actions1-content" id="additional-actions1-header">    
                <FormControlLabel 
                    aria-label="Acknowledge" onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()} control={<Checkbox />} 
                    label={taref.nome_tarefa}
                />        
              </AccordionSummary>
            </Accordion>
          </div>
        ))}
      </div>
    );
  }
}