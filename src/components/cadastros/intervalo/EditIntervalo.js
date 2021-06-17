import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import '../../table/Table.css';


const initialValue = {
  id_intervalo: '',
  desc_intervalo: '',
  objeto: '',
}

const EditarIntervaloForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function loadIntervalo(id) {
    if(id){
      api.get(`/intervalo/visualizar/${id}`)
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
    api.put(`/intervalo/atualizar`, values)
      .then((response) => {
        history.push('/listar/intervalo');
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Editar de Intervalo</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit} >
        <div key="desc_intervalo" className="orgao-form__orgao">
          <label htmlFor="desc_intervalo">Descrição do Intervalo</label>
          <input className="orgao-form__orgao" id="desc_intervalo" name="desc_intervalo" type="text" onChange={onChangeField} value={values.desc_intervalo} />
        </div>
        
        <div key="objeto" className="orgao-form__orgao">
          <label htmlFor="objeto">Objeto</label>
          <input className="orgao-form__orgao" id="objeto" name="objeto" type="text" onChange={onChangeField}  value={values.objeto}/>
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