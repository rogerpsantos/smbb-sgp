import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import '../../table/Table.css';


const initialValue = {
  id_agenda: '',
  titulo: '',
  resumo: '',
  inicio: '',
  fim: '',
  cor: ''
}

const EditarAgendaForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function loadAgenda(id) {
    if(id){
      api.get(`/agenda/visualizar/${id}`)
        .then((response) => {
          setValues(response.data);
        })
    }
  }

  useEffect(() => {
    if(id)     
      loadAgenda(id);    
  },[id]);
  
  function onChangeField(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value});
    console.log(values);
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.put(`/agenda/atualizar`, values)
      .then((response) => {
        history.push('/listar/agenda');
        // alert("ALTERADO COM SUCESSO");
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Editar de Agenda</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit} >
        <div key="titulo" className="orgao-form__orgao">
          <label htmlFor="titulo">Descrição do Título</label>
          <input className="orgao-form__orgao" id="titulo" name="titulo" type="text" onChange={onChangeField} value={values.titulo} />
        </div>
        
        <div key="resumo" className="orgao-form__orgao">
          <label htmlFor="resumo">Resumo</label>
          <input className="orgao-form__orgao" id="resumo" name="resumo" type="text" onChange={onChangeField}  value={values.resumo}/>
        </div>

        <div key="inicio" className="orgao-form__orgao">
          <label htmlFor="inicio">Data Início</label>
          <input id="inicio" name="inicio" type="text" onChange={onChangeField}  value={values.inicio} />
        </div>

        <div key="fim" className="orgao-form__orgao">
          <label htmlFor="fim">Data Fim</label>
          <input id="fim" name="fim" type="text" onChange={onChangeField}  value={values.fim} />
        </div>

        <div key="cor" className="orgao-form__orgao">
          <label htmlFor="cor">Cor</label>
          <input id="cor" name="cor" type="color" onChange={onChangeField}  value={values.cor} />
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

export default EditarAgendaForm;