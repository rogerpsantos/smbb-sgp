import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import '../../table/Table.css';


const initialValue = {
  id_feriado: '',
  desc_feriado: '',
  data: '',
}

const EditarFeriadoForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function loadFeriado(id) {
    if(id){
      api.get(`/feriado/visualizar/${id}`)
        .then((response) => {
          setValues(response.data);
        })
    }
  }

  useEffect(() => {
    if(id)     
      loadFeriado(id);    
  },[id]);
  
  function onChangeField(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value});
    console.log(values);
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.put(`/feriado/atualizar`, values)
      .then((response) => {
        history.push('/listar/feriado');
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Editar de Feriado</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit} >
        <div key="desc_feriado" className="orgao-form__orgao">
          <label htmlFor="desc_feriado">Descrição do Feriado</label>
          <input className="orgao-form__orgao" id="desc_feriado" name="desc_feriado" type="text" onChange={onChangeField} value={values.desc_feriado} />
        </div>
        
        <div key="data" className="orgao-form__orgao">
          <label htmlFor="data">Data</label>
          <input className="orgao-form__orgao" id="data" name="data" type="text" onChange={onChangeField}  value={values.data}/>
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

export default EditarFeriadoForm;