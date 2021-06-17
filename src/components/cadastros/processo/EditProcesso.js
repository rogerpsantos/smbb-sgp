import React, { useState, useEffect} from 'react';
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

const EditarEtapaForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function loadEtapa(id) {
    if(id){
      api.get(`/etapa/visualizar/${id}`)
        .then((response) => {
          setValues(response.data);
        })
    }
  }

  useEffect(() => {
    if(id)     
      loadEtapa(id);    
  },[id]);
  
  function onChangeField(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value});
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.put(`/etapa/atualizar`, values)
      .then((response) => {
        history.push('/listar/etapa');
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Editar Etapa</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit} >
        <div key="cod_etapa" className="orgao-form__orgao">
          <label htmlFor="cod_etapa">Código da Etapa</label>
          <input className="orgao-form__orgao" id="cod_etapa" name="cod_etapa" type="text" onChange={onChangeField} value={values.cod_etapa} />
        </div>
        
        <div key="nome_etapa" className="orgao-form__orgao">
          <label htmlFor="nome_etapa">Descrição da Etapa</label>
          <input className="orgao-form__orgao" id="nome_etapa" name="nome_etapa" type="text" onChange={onChangeField}  value={values.nome_etapa}/>
        </div>

        <div key="observacao" className="orgao-form__orgao">
          <label htmlFor="observacao">Observação</label>
          <input className="orgao-form__orgao" id="observacao" name="observacao" type="text" onChange={onChangeField}  value={values.observacao}/>
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

export default EditarEtapaForm;