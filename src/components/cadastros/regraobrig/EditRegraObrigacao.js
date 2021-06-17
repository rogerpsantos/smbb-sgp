import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import '../../table/Table.css';


const initialValue = {
  id_regra_prazo: '',
  desc_regra: '',
  coeficiente: '',
  data_prazo: '',
}

const EditarIntervaloForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function loadIntervalo(id) {
    if(id){
      api.get(`/prazoobrig/visualizar/${id}`)
        .then((response) => {
          setValues(response.data);
        })
    }
  }

  useEffect(() => {
    if(id)     
      loadIntervalo(id);    
  },[id]);
  
  function onChangeField(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value});
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.put(`/prazoobrig/atualizar`, values)
      .then((response) => {
        history.push('/listar/prazoobrig');
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Editar Regra Prazo de Obrigação</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit} >
        <div key="desc_regra" className="orgao-form__orgao">
          <label htmlFor="desc_regra">Descrição Regra</label>
          <input className="orgao-form__orgao" id="desc_regra" name="desc_regra" type="text" onChange={onChangeField} value={values.desc_regra} />
        </div>
        
        <div key="coeficiente" className="orgao-form__orgao">
          <label htmlFor="coeficiente">Coeficiente</label>
          <input id="coeficiente" name="coeficiente" type="text" onChange={onChangeField}  value={values.coeficiente}/>
        </div>

        <div key="data_prazo" className="orgao-form__orgao">
          <label htmlFor="data_prazo">Data Prazo</label>
          <input id="data_prazo" name="data_prazo" type="text" onChange={onChangeField}  value={values.data_prazo}/>
        </div>

        <div>
          <br/>
          <Button><SaveIcon/> ALTERAR</Button>
        </div>
      </form>
      </div>
    </div>
    
  )
}

export default EditarIntervaloForm;