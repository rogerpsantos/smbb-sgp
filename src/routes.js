import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import Main from './pages/main/Index';
import Federal from './pages/obrigacoes/federal/index';
import etapasProjeto from '../src/pages/obrigacoes/estadual/EtapasProjeto';
import Agenda from './pages/agenda/index';
import Orgao from './pages/cadastros/orgaos/Orgao';


const Routes = () => {
  return(
    <Router>
      <Switch>
        <Route path="/ListaProjeto" component={etapasProjeto} />
        <Route path="/cadastrar/orgao" component={Orgao} />
        <Route path="/editar/orgao/:id" component={Orgao} />
        <Route path="/Federal" component={Federal} />
        <Route path="/Agenda" component={Agenda} />
        <Route path="/" component={Main} />
        
      </Switch>
    </Router>
  )
  };

export default Routes;