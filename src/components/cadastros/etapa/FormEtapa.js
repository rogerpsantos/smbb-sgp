import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import '../../table/Table.css';


const initialValue = {
  cod_etapa: '',
  nome_etapa: '',
  observacao: '',
}

const CadastroEtapaForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function onChange(ev) {
    const { name, value } = ev.target;
    console.log(values);
    setValues({ ...values, [name]: value});
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.post(`/etapa/cadastrar/`, values)
      .then((response) => {
        history.push('/listar/etapa');
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Cadastro de Etapa</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit}>
      <div key="cod_etapa" className="orgao-form__orgao">
          <label htmlFor="cod_etapa">Código da Etapa</label>
          <input className="orgao-form__orgao" id="cod_etapa" name="cod_etapa" type="text" onChange={onChange} />
        </div>
        
        <div key="nome_etapa" className="orgao-form__orgao">
          <label htmlFor="nome_etapa">Descrição da Etapa</label>
          <input className="orgao-form__orgao" id="nome_etapa" name="nome_etapa" type="text" onChange={onChange} />
        </div>

        <div key="observacao" className="orgao-form__orgao">
          <label htmlFor="observacao">Observação</label>
          <input className="orgao-form__orgao" id="observacao" name="observacao" type="text" onChange={onChange} />
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