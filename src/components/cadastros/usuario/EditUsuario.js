import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import '../../table/Table.css';


const initialValue = {
  nome: '',
  sobrenome: '',
  email: '',
  login: '',
  status: '',
  senha: '',
  nivel: '',
  perfil: '',
  grp_usuario: '',
  deletado: '',
  usuario_alteracao: '',
  data_alteracao: '',
  data_cadastro: '',
}

const EditarUsuarioForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  const today = new Date();
  var dia = today.getDate();
  var mes = today.getMonth() + 1;
  var ano = today.getFullYear();

  if (mes < 10) {
    mes = '0'+mes;
  } 

  const data_alteracao = (dia+'/'+mes+'/'+ano);

  values.data_alteracao = data_alteracao;


  function loadUsuario(id) {
    if(id){
      api.get(`/usuario/visualizar/${id}`)
        .then((response) => {
          setValues(response.data);
        })
    }
  }

  useEffect(() => {
    if(id)     
    loadUsuario(id);    
  },[id]);
  
  function onChangeField(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value});
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.put(`/usuario/atualizar`, values)
      .then((response) => {
        history.push('/listar/usuario');
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Editar Usuário</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit} >              
        <div key="nome" className="orgao-form__orgao">
          <label htmlFor="nome">Nome</label>
          <input className="orgao-form__orgao" id="nome" name="nome" type="text" onChange={onChangeField} value={values.nome} />
        </div>

        <div key="sobrenome" className="orgao-form__orgao">
          <label htmlFor="sobrenome">Sobrenome</label>
          <input className="orgao-form__orgao" id="sobrenome" name="sobrenome" type="text" onChange={onChangeField} value={values.sobrenome} />
        </div> 

        <div key="email" className="orgao-form__orgao">
          <label htmlFor="email">E-mail</label>
          <input className="orgao-form__orgao" id="email" name="email" type="text" onChange={onChangeField} value={values.email} />
        </div> 

        <div key="login" className="orgao-form__orgao">
          <label htmlFor="login">Login</label>
          <input className="orgao-form__orgao" id="login" name="login" type="text" onChange={onChangeField} value={values.login} />
        </div> 

        <div key="status" className="orgao-form__orgao">
            <label htmlFor="status">Status</label>
            <select id="status" className="orgao-form__orgao" name="status" onChange={onChangeField} >
              <option value={values.status}>{values.status === 'A' ? 'Ativo' : 'Inativo'}</option>
              <option value="A">Ativo</option>
              <option value="I">Inativo</option>
            </select>
          </div>

        <div key="senha" className="orgao-form__orgao">
          <label htmlFor="senha">Senha</label>
          <input className="orgao-form__orgao" id="senha" name="senha" type="text" onChange={onChangeField} value={values.senha} />
        </div> 

        <div key="nivel" className="orgao-form__orgao">
          <label htmlFor="nivel">Nível</label>
          <input className="orgao-form__orgao" id="nivel" name="nivel" type="text" onChange={onChangeField} value={values.nivel} />
        </div> 

        <div key="perfil" className="orgao-form__orgao">
          <label htmlFor="perfil">Perfil</label>
          <input className="orgao-form__orgao" id="perfil" name="perfil" type="text" onChange={onChangeField} value={values.perfil} />
        </div> 

        <div key="grp_usuario" className="orgao-form__orgao">
          <label htmlFor="grp_usuario">Grupo Usuário</label>
          <input className="orgao-form__orgao" id="grp_usuario" name="grp_usuario" type="text" onChange={onChangeField} value={values.grp_usuario} />
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

export default EditarUsuarioForm;