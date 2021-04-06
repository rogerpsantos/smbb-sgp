import React, { Component } from 'react';
// import { useHistory } from 'react-router-dom';
import Button from '../../button/Button';
import './FormOrgao.css';
import api from '../../../services/api';
import SaveIcon from '@material-ui/icons/Save';
// import Container from '@material-ui/core/Container';



export default class OrgaoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content_div_orgao: [],
      content_municipio: [],
      desc_orgao: '',
      uf: '',
      div_orgao: '',
      cod_mun: '',
    };
  }
  

  componentDidMount() {
    this.loadDivOrgao();
  }

  loadDivOrgao = async () => {
    const response = await api.get(`/divorgao/listar`);
    const { content } = response.data;
    this.setState({ content_div_orgao: content });
  }
 
  // loadMunicipio = async (value) => {
  //   // const response = await api.get(`/municipio/listaporuf/${value}`);
  //   // const { content } = response.data;
  //   this.setState({ content_div_orgao: value });
  // }

  render() {

  const { content_div_orgao } = this.state;
  
  // function onChange(ev){
  async function onChange(ev){
      const { value }  = ev.target;
      const response = await api.get(`/municipio/listaporuf/${value}`);
      const { content } = response.data;
      this.state.content_municipio = content;
  }

  const { content_municipio } = this.state;
  

  function onSubmit(ev) {
    ev.preventDefault();

    // api.post('/orgao/cadastrar', values)
    //   .then((response) => {
    //     history.push('/orgao/listar');
    //   });
  }
  
  return (
    <div className="div-orgao">
      <h3>Cadastro de Órgãos</h3>
    
      <div>
        <br/>
        <br/>
      <form onSubmit={onSubmit} className="orgao-form__orgao" noValidate autoComplete="on">
        <div key="desc_orgao"className="orgao-form__orgao">
          <label htmlFor="desc_orgao">Descrição do Orgão</label>
          <input className="orgao-form__orgao" id="desc_orgao" name="desc_orgao" type="text" onChange={onChange} />
        </div>
        <div key="uf" className="orgao-form__orgao">
          <label htmlFor="uf">UF</label>
          <select id="uf" className="orgao-form__orgao" name="uf" onChange={onChange}>
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
          <label htmlFor="div_orgao">Divisão do Orgão</label>
          <select id="div_orgao" className="orgao-form__orgao" name="div_orgao" onChange={onChange} >
              <option value=""> </option> 
              {content_div_orgao.map(divOrg => (
              <option key={divOrg.id_div_orgao} value={divOrg.id_div_orgao}>{divOrg.id_div_orgao + " - " + divOrg.descricao}</option>
              ))} 
          </select>
            
        </div>

        <div className="orgao-form__orgao">
          <label htmlFor="cod_municipio">Cod. Municipio</label>
          <select id="cod_municipio" className="orgao-form__orgao" name="cod_municipio" >
            {content_municipio.map(codMun => (
              <option key={codMun.id_municipio} value={codMun.id_municipio}>{codMun.desc_mun}</option>
            ))}   
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
}
// export default OrgaoForm;