import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import './FormOrgao.css';

const initialValue = {
  desc_orgao: '',
  uf: '',
  id_div_orgao: 0,
  cod_mun: '',
}

const CadastroOrgaoForm = ({ id }) => {  
  const [values, setValues] = useState(initialValue);
  const [uf, setUF] = useState('');
  const [listMunicipio, setListMunicipio] = useState([]);
  const [listDivOrgao, setListDivOrgao] = useState([]);
  const history = useHistory();

  function loadDivOrgao() {
    api.get(`/divorgao/listar`)
        .then((response) => {
    setListDivOrgao(response.data.content);
  })};
  
  function loadMunicipio(id) {
    if(id){
      api.get(`/municipio/listaporuf/${id}`)
        .then((response) => {
          setListMunicipio(response.data);
        })
    }
  };

  useEffect(() => {
    loadDivOrgao();
  });

  useEffect(() => {
    loadMunicipio(uf);
  }, [uf]);
  
  
  function onChange(ev) {
    setUF(ev.target.value);
  }

  function onChangeField(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value});
  }

  function onSubmit(ev) {
    ev.preventDefault();
    api.post(`/orgao/cadastrar/`, values)
      .then((response) => {
        history.push('/');
        alert("CADASTRADO COM SUCESSO");
      });
  }
  
  return (
    <div className="div-orgao">
      <h3>Cadastro de Órgãos</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on" onSubmit={onSubmit} >
        <div key="desc_orgao" className="orgao-form__orgao">
          <label htmlFor="desc_orgao">Descrição do Orgão</label>
          <input className="orgao-form__orgao" id="desc_orgao" name="desc_orgao" type="text" onChange={onChangeField} />
        </div>
        <div className="orgao-form__orgao">
          <label htmlFor="id_div_orgao">Divisão do Orgão</label>
          <select id="id_div_orgao" className="orgao-form__orgao" name="id_div_orgao" type="number" onChange={onChangeField} >
              <option value=""></option>
              {listDivOrgao.map((divOrg => (
              <option key={divOrg.id_div_orgao} value={divOrg.id_div_orgao}>{divOrg.descricao}</option>
              )))}
          </select>
        </div>
        <div key="uf" className="orgao-form__orgao">
          <label htmlFor="uf">UF</label>
          <select id="uf" className="orgao-form__orgao" name="uf" onChange={onChange} onClick={onChangeField}>
            <option value=""></option>
            <option value="AC">Acre (AC)</option>
            <option value="AL">Alagoas (AL)</option>
            <option value="AP">Amapá (AP)</option>
            <option value="AM">Amazonas (AM)</option>
            <option value="BA">Bahia (BA)</option>
            <option value="CE">Ceará (CE)</option>
            <option value="DF">Distrito Federal (DF)</option>
            <option value="ES">Espírito Santo (ES)</option>
            <option value="GO">Goiás (GO)</option>
            <option value="MA">Maranhão (MA)</option>
            <option value="MT">Mato Grosso (MT)</option>
            <option value="MS">Mato Grosso do Sul (MS)</option>
            <option value="MG">Minas Gerais (MG)</option>
            <option value="PA">Pará (PA)</option>
            <option value="PB">Paraíba (PB)</option>
            <option value="PR">Paraná (PR)</option>
            <option value="PE">Pernambuco (PE)</option>
            <option value="PI">Piauí (PI)</option>
            <option value="RJ">Rio de Janeiro (RJ)</option>
            <option value="RN">Rio Grande do Norte (RN)</option>
            <option value="RS">Rio Grande do Sul (RS)</option>
            <option value="RO">Rondônia (RO)</option>
            <option value="RR">Roraima (RR)</option>
            <option value="SC">Santa Catarina (SC)</option>
            <option value="SP">São Paulo (SP)</option>
            <option value="SE">Sergipe (SE)</option>
            <option value="TO">Tocantins (TO)</option>
          </select>
        </div>
         <div className="orgao-form__orgao">
          <label htmlFor="cod_mun">Municipio</label>
          <select id="cod_mun" className="orgao-form__orgao" name="cod_mun" onChange={onChangeField} >
              <option value=""></option>
              {listMunicipio.map((codMun => (
               <option key={codMun.id_municipio} value={codMun.id_municipio}>{codMun.desc_mun}</option>
              )))}
          </select>
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

export default CadastroOrgaoForm;