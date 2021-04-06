import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AttachmentIcon from '@material-ui/icons/Attachment';
import UpdateIcon from '@material-ui/icons/Update';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import UIModal from '../../components/UI/Modal/Modal';
import { green } from '@material-ui/core/colors';
import api from '../../services/api';
import Link from '@material-ui/core/Link';
// import lerJson from '../projects/lerJson';


export default class Etapas extends Component {
  state = {
    content: [],
    projetos: {},
    page: 1,
  };

  componentDidMount() {
    this.loadEtapas();
    // this.processarJson();
  }

  loadEtapas = async (page = 0) => {
    const response = await api.get(`/projeto/listar?page=${page}`);
    const { content } = response.data;
    this.setState({ content: content, page });
  }

  render() {

    const { content } = this.state;

    const abrirArquivo = (local_anexo) => {
      
    }

    return (
      <div>
        {content.map(dados => (
          <div key={dados.id_projeto}>
            {/* <h3><b>Projeto:</b> {dados.nome_projeto} </h3> */}
            {dados.etapas.map(etap => (
              <div key={etap.id_etapa} className="etapa-list">
                <Accordion>
                  <AccordionSummary 
                      expandIcon={<ExpandMoreIcon />} 
                      aria-label="Expand" 
                      aria-controls="additional-actions1-content" 
                      id="additional-actions1-header">
                    <FormControlLabel
                      aria-label="Acknowledge" 
                      onClick={(event) => event.stopPropagation()} 
                      onFocus={(event) => event.stopPropagation()} 
                      control={<Checkbox />}
                      label={etap.cod_etapa +" - "+ etap.nome_etapa}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography color="textSecondary">

                      {etap.processos.map(proc =>
                        <div key={proc.id_processo} className="processo-list">
                          <Accordion>
                            <AccordionSummary 
                              expandIcon={<ExpandMoreIcon />} 
                              aria-label="Expand" 
                              aria-controls="additional-actions1-content" 
                              id="additional-actions1-header">
                              <FormControlLabel
                                aria-label="Acknowledge" 
                                onClick={(event) => event.stopPropagation()} 
                                onFocus={(event) => event.stopPropagation()} 
                                control={<Checkbox />}
                                label={proc.cod_processo+" - "+ proc.nome_processo}
                              />
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography color="textSecondary">

                                {proc.tarefas.map(taref => (
                                  <div key={taref.id_tarefa} className="tarefa-list">
                                    <Accordion>
                                      <AccordionSummary 
                                        expandIcon={<ExpandMoreIcon />} 
                                        aria-label="Expand" 
                                        aria-controls="additional-actions1-content" 
                                        id="additional-actions1-header">
                                        <FormControlLabel
                                          aria-label="Acknowledge" 
                                          onClick={(event) => event.stopPropagation()} 
                                          onFocus={(event) => event.stopPropagation()} 
                                          control={<Checkbox />}
                                          label={taref.cod_tarefa +" - "+ taref.nome_tarefa}
                                        />
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <Typography color="textSecondary">
                                            <br/>
                                            {taref.anexos.map(anex => (
                                              <div key={anex.id_anexo}>
                                                {{anex} && 
                                                <Link>
                                                <AttachmentIcon 
                                                   fontSize="large" 
                                                   color="primary"
                                                  //  alt={}
                                                  //  href={anex.local_anexo} 
                                                   onClick = {() => abrirArquivo()}> 

                                                   
                                                </AttachmentIcon></Link>
                                                }
                                                <UpdateIcon fontSize="large" color="primary">
                                                <UIModal isOpen>
                                                  <h1>Histórico da Tarefa</h1>
                                                </UIModal>

                                                </UpdateIcon>
                                                <AssistantPhotoIcon fontSize="large" style={{ color: green[500] }}></AssistantPhotoIcon>
                                              </div>
                                              
                                            ))}
                                        </Typography>
                                      </AccordionDetails>
                                    </Accordion>
                                  </div>
                                ))}


                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      )}
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