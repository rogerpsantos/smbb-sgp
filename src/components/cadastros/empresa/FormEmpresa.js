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
    api.post(`/intervalo/cadastrar/`, values)
      .then((response) => {
        history.push('/listar/intervalo');
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Cadastro de Intervalo</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit}>
        <div key="desc_intervalo" className="orgao-form__orgao">
          <label htmlFor="desc_intervalo">Descrição do Intervalo</label>
          <input className="orgao-form__orgao" id="desc_intervalo" name="desc_intervalo" type="text" onChange={onChange} />
        </div>

        <div key="objeto" className="orgao-form__orgao">
          <label htmlFor="objeto">Objeto</label>
          <input id="objeto" name="objeto" type="text" onChange={onChange} />
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