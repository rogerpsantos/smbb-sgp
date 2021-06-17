import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import '../../table/Table.css';


const initialValue = {
  desc_feriado: '',
  data: '',
}

const CadastroFeriadoForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function onChange(ev) {
    const { name, value } = ev.target;
    console.log(values);
    setValues({ ...values, [name]: value});
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.post(`/feriado/cadastrar/`, values)
      .then((response) => {
        history.push('/listar/feriado');
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Cadastro de Feriado</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit} >
        <div key="desc_feriado" className="orgao-form__orgao">
          <label htmlFor="titulo">Descrição do Feriado</label>
          <input className="orgao-form__orgao" id="desc_feriado" name="desc_feriado" type="text" onChange={onChange} />
        </div>

        <div key="data" className="orgao-form__orgao">
          <label htmlFor="data">Data</label>
          <input id="data" name="data" type="text" onChange={onChange} />
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

export default CadastroFeriadoForm;