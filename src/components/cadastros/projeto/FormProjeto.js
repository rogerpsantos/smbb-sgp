import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import '../../table/Table.css';


const initialValue = {
  cod_projeto: '',
  nome_projeto: '',
  observacao: '',
}

const CadastroProjetoForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function onChange(ev) {
    const { name, value } = ev.target;
    console.log(values);
    setValues({ ...values, [name]: value});
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.post(`/projeto/cadastrar/`, values)
      .then((response) => {
        history.push('/listar/projeto');
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Cadastro de Projeto</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit}>
      <div key="cod_projeto" className="orgao-form__orgao">
          <label htmlFor="cod_projeto">Código do Projeto</label>
          <input className="orgao-form__orgao" id="cod_projeto" name="cod_projeto" type="text" onChange={onChange} />
        </div>
        
        <div key="nome_projeto" className="orgao-form__orgao">
          <label htmlFor="nome_projeto">Nome</label>
          <input className="orgao-form__orgao" id="nome_projeto" name="nome_projeto" type="text" onChange={onChange} />
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

export default CadastroProjetoForm;