import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import api from '../../services/api';
import Tarefas from '../projects/tarefas';


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
    const { content } = response.data;
    this.setState({ content: content, page});
  }


  render() {

    const { content } = this.state;

    return (
      <div>
        {content.map(taref => (
          <div key={taref.id_tarefa}>
            {taref.processos.map(proc => (
                  <div key={this.props.id} className="processo-list">
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label="Expand" aria-controls="additional-actions1-content" id="additional-actions1-header">    
                        <FormControlLabel 
                            aria-label="Acknowledge" onClick={(event) => event.stopPropagation()} onFocus={(event) => event.stopPropagation()} control={<Checkbox />} 
                            label={proc.nome_processo}
                        />        
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography color="textSecondary">
                          <Tarefas id={this.props.children}/>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
            ))}
          </div> 
         ))}
      </div>
    );
  }
}