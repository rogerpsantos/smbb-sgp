import React, { useState } from 'react';
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
  data_cadastro: '',
  usuario_alteracao: '',
  data_alteracao: '',
}

const CadastroUsuarioForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  const today = new Date();
  var dia = today.getDate();
  var mes = today.getMonth() + 1;
  var ano = today.getFullYear();

  if (mes < 10) {
    mes = '0'+mes;
  } 

  const data_cadastro = (dia+'/'+mes+'/'+ano);

  values.data_cadastro = data_cadastro;

  function onChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value});
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.post(`/usuario/cadastrar/`, values)
      .then((response) => {
        history.push('/listar/usuario');
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Cadastro de Usuário</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit}>
          <div key="nome" className="orgao-form__orgao">
            <label htmlFor="nome">Nome</label>
            <input className="orgao-form__orgao" id="nome" name="nome" type="text" onChange={onChange} />
          </div>

          <div key="sobrenome" className="orgao-form__orgao">
            <label htmlFor="sobrenome">Sobrenome</label>
            <input className="orgao-form__orgao" id="sobrenome" name="sobrenome" type="text" onChange={onChange} />
          </div> 

          <div key="email" className="orgao-form__orgao">
            <label htmlFor="email">E-mail</label>
            <input className="orgao-form__orgao" id="email" name="email" type="text" onChange={onChange} />
          </div> 

          <div key="login" className="orgao-form__orgao">
            <label htmlFor="login">Login</label>
            <input className="orgao-form__orgao" id="login" name="login" type="text" onChange={onChange} />
          </div> 

          <div key="status" className="orgao-form__orgao">
            <label htmlFor="status">Status</label>
            <select id="status" className="orgao-form__orgao" name="status" onChange={onChange}>
              <option value=""></option>
              <option value="A">Ativo</option>
              <option value="I">Inativo</option>
            </select>
          </div>

          <div key="senha" className="orgao-form__orgao">
            <label htmlFor="senha">Senha</label>
            <input className="orgao-form__orgao" id="senha" name="senha" type="text" onChange={onChange} />
          </div> 

          <div key="nivel" className="orgao-form__orgao">
            <label htmlFor="nivel">Nível</label>
            <input className="orgao-form__orgao" id="nivel" name="nivel" type="text" onChange={onChange} />
          </div> 

          <div key="perfil" className="orgao-form__orgao">
            <label htmlFor="perfil">Perfil</label>
            <input className="orgao-form__orgao" id="perfil" name="perfil" type="text" onChange={onChange} />
          </div> 

          <div key="grp_usuario" className="orgao-form__orgao">
            <label htmlFor="grp_usuario">Grupo Usuário</label>
            <input className="orgao-form__orgao" id="grp_usuario" name="grp_usuario" type="text" onChange={onChange} />
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

export default CadastroUsuarioForm;