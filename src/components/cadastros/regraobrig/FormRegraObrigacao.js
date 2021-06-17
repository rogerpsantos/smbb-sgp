import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import '../../table/Table.css';


const initialValue = {
  desc_intervalo: '',
  objeto: '',
}

const CadastroIntervaloForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function onChange(ev) {
    const { name, value } = ev.target;
    console.log(values);
    setValues({ ...values, [name]: value});
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.post(`/prazoobrig/cadastrar/`, values)
      .then((response) => {
        history.push('/listar/prazoobrig');
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Cadastro Regra Prazo de Obrigação</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit}>
        <div key="desc_regra" className="orgao-form__orgao">
          <label htmlFor="desc_regra">Descrição Regra</label>
          <input className="orgao-form__orgao" id="desc_regra" name="desc_regra" type="text" onChange={onChange} />
        </div>

        <div key="coeficiente" className="orgao-form__orgao">
          <label htmlFor="coeficiente">Coeficiente</label>
          <input id="coeficiente" name="coeficiente" type="text" onChange={onChange} />
        </div>

        <div key="data_prazo" className="orgao-form__orgao">
          <label htmlFor="data_prazo">Data Prazo</label>
          <input id="data_prazo" name="data_prazo" type="text" onChange={onChange} />
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

export default CadastroIntervaloForm;