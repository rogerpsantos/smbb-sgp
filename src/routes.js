import React from 'react';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';

import Main from './pages/main/Index';
import Federal from './pages/obrigacoes/federal/index';
import etapasProjeto from '../src/pages/obrigacoes/estadual/EtapasProjeto';

import Agenda from './pages/cadastros/agenda/Agenda';
import Orgao from './pages/cadastros/orgaos/Orgao';
import Feriado from './pages/cadastros/feriado/Feriado';
import Intervalo from './pages/cadastros/intervalo/Intervalo';
import RegraObrigacao from './pages/cadastros/regraobrig/RegraObrigacao';
import Empresa from './pages/cadastros/empresa/Empresa';
import Projeto from './pages/cadastros/projeto/Projeto';
import Etapa from './pages/cadastros/etapa/Etapa';
import Processo from './pages/cadastros/processo/Processo';
import Usuario from './pages/cadastros/usuario/Usuario';

import ListOrgao from './pages/cadastros/orgaos/ListOrgao';
import ListAgenda from './pages/cadastros/agenda/ListarAgenda';
import ListFeriado from './pages/cadastros/feriado/ListarFeriado';
import ListIntervalo from './pages/cadastros/intervalo/ListarIntervalo';
import ListarRegraObrigacao from './pages/cadastros/regraobrig/ListarRegraObrigacao';
import ListarEmpresa from './pages/cadastros/empresa/ListarEmpresa';
import ListarProjeto from './pages/cadastros/projeto/ListarProjeto';
import ListarEtapa from './pages/cadastros/etapa/ListarEtapa';
import ListarProcesso from './pages/cadastros/processo/ListarProcesso';
import ListarUsuario from './pages/cadastros/usuario/ListarUsuario';


const Routes = () => {
  return(
    <Router>
      <Switch>

        {/* EMPRESA */}
        <Route path="/listar/empresa" component={ListarEmpresa} />
        <Route path="/cadastrar/empresa" component={Empresa} />
        <Route path="/editar/empresa/:id" component={Empresa} />

        {/* GRUPO EMPRESA */}
        <Route path="/listar/grpemp" component={etapasProjeto} />
        <Route path="/cadastrar/grpemp" component={Orgao} />
        <Route path="/editar/grpemp/:id" component={Orgao} />

        {/* USUÁRIO */}
        <Route path="/listar/usuario" component={ListarUsuario} />
        <Route path="/cadastrar/usuario" component={Usuario} />
        <Route path="/editar/usuario/:id" component={Usuario} />

        {/* PROJETOS */}
        <Route path="/listar/projeto" component={ListarProjeto} />
        <Route path="/cadastrar/projeto" component={Projeto} />
        <Route path="/editar/projeto/:id" component={Projeto} />

        {/* ETAPAS */}
        <Route path="/listar/etapa" component={ListarEtapa} />
        <Route path="/cadastrar/etapa" component={Etapa} />
        <Route path="/editar/etapa/:id" component={Etapa} />

        {/* PROCESSOS */}
        <Route path="/listar/processo" component={ListarProcesso} />
        <Route path="/cadastrar/processo" component={Processo} />
        <Route path="/editar/processo/:id" component={Processo} />

        {/* TAREFAS */}
        <Route path="/listar/tarefa" component={etapasProjeto} />
        <Route path="/cadastrar/tarefa" component={Orgao} />
        <Route path="/editar/tarefa/:id" component={Orgao} />

        {/* OBRIGACOES */}
        <Route path="/Federal" component={Federal} />

        {/* ORGAO */}
        <Route path="/listar/orgao" component={ListOrgao} />    
        <Route path="/cadastrar/orgao" component={Orgao} />
        <Route path="/editar/orgao/:id" component={Orgao} />

        {/* AGENDA */}
        <Route path="/listar/agenda" component={ListAgenda} />
        <Route path="/cadastrar/agenda" component={Agenda} />
        <Route path="/editar/agenda/:id" component={Agenda} />

        {/* FERIADO */}
        <Route path="/listar/feriado" component={ListFeriado} />
        <Route path="/cadastrar/feriado" component={Feriado} />
        <Route path="/editar/feriado/:id" component={Feriado} />

        {/* INTERVALO */}
        <Route path="/listar/intervalo" component={ListIntervalo} />
        <Route path="/cadastrar/intervalo" component={Intervalo} />
        <Route path="/editar/intervalo/:id" component={Intervalo} />

        {/* REGRA PRAZO OBRIGAÇÃO */}
        <Route path="/listar/prazoobrig" component={ListarRegraObrigacao} />
        <Route path="/cadastrar/prazoobrig" component={RegraObrigacao} />
        <Route path="/editar/prazoobrig/:id" component={RegraObrigacao} />

        <Route path="/listar/projetos" component={etapasProjeto} />

        {/* MENUS E TELA PRINCIPAL */}
        {/* <Route path="/cadastros" component={MenuCadastros} /> */}
        <Route path="/" component={Main} />
        
      </Switch>
    </Router>
  )
  };

export default Routes;