import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import '../../table/Table.css';


const initialValue = {
  titulo: '',
  resumo: '',
  inicio: '',
  fim: '',
  cor: ''
}

const CadastroAgendaForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function onChange(ev) {
    const { name, value } = ev.target;
    console.log(values);
    setValues({ ...values, [name]: value});
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.post(`/agenda/cadastrar/`, values)
      .then((response) => {
        history.push('/listar/agenda');
        alert("CADASTRADO COM SUCESSO");
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Cadastro de Agenda</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit} >
        <div key="titulo" className="orgao-form__orgao">
          <label htmlFor="titulo">Descrição do Título</label>
          <input className="orgao-form__orgao" id="titulo" name="titulo" type="text" onChange={onChange} />
        </div>
        
        <div key="resumo" className="orgao-form__orgao">
          <label htmlFor="resumo">Resumo</label>
          <input className="orgao-form__orgao" id="resumo" name="resumo" type="text" onChange={onChange} />
        </div>

        <div key="inicio" className="orgao-form__orgao">
          <label htmlFor="inicio">Data Início</label>
          <input id="inicio" name="inicio" type="text" onChange={onChange} />
        </div>

        <div key="fim" className="orgao-form__orgao">
          <label htmlFor="fim">Data Fim</label>
          <input id="fim" name="fim" type="text" onChange={onChange} />
        </div>

        <div key="cor" className="orgao-form__orgao">
          <label htmlFor="cor">Cor</label>
          <input id="cor" name="cor" type="color" onChange={onChange} />
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

export default CadastroAgendaForm;