import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import '../../table/Table.css';


const initialValue = {
  id_processo: '',
  cod_processo: '',
  nome_processo: '',
  observacao: '',
  etapa: '',
}

const CadastroEtapaForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const [listEtapa, setListEtapas] = useState([]);
  const history = useHistory();

  function onChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value});
  }

  function loadEtapa() {
      api.get(`/etapa/listar`)
        .then((response) => {
          setListEtapas(response.data.content);
        })
  };

  useEffect(() => {
    loadEtapa();
  }, []);

  function onSubmit(ev) {
    ev.preventDefault();
    api.post(`/processo/cadastrar/`, values)
      .then((response) => {
        history.push('/listar/processo');
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Cadastro de Processo</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit}>
      <div key="cod_processo" className="orgao-form__orgao">
          <label htmlFor="cod_processo">Código do Processo</label>
          <input className="orgao-form__orgao" id="cod_processo" name="cod_processo" type="text" onChange={onChange} />
        </div>
        
        <div key="nome_processo" className="orgao-form__orgao">
          <label htmlFor="nome_processo">Descrição do Processo</label>
          <input className="orgao-form__orgao" id="nome_processo" name="nome_processo" type="text" onChange={onChange} />
        </div>

        <div key="observacao" className="orgao-form__orgao">
          <label htmlFor="observacao">Observação</label>
          <input className="orgao-form__orgao" id="observacao" name="observacao" type="text" onChange={onChange} />
        </div>

        <div key="id_etapa" className="orgao-form__orgao">
          <label htmlFor="id_etapa">Etapa</label>
          <select id="id_etapa" className="orgao-form__orgao" name="id_etapa" onChange={onChange} >
            <option value=""></option>
            {listEtapa.map((etap => (
             <option value={etap.id_etapa}>{etap.cod_etapa + " - "+ etap.nome_etapa}</option> 
             )))}
          </select>
        </div>

        <div>
          <br/>
          <Button><SaveIcon/> Cadastrar</Button>
        </div>
      </form>
      </div>
    </div>
    
  )
}

export default CadastroEtapaForm;