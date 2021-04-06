import React, { useState, useEffect} from 'react';
// import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import Button from '../../button/Button';
import SaveIcon from '@material-ui/icons/Save';
import './FormOrgao.css';



const CadastroOrgaoForm = ({ id }) => {  

    const initialValue = {
      desc_orgao: '',
      uf: '',
      div_orgao: '',
      cod_mun: '',
      descricao: '',
      id_div_orgao: '',
      desc_mun: '',
    }


    const [values, setValues] = useState(initialValue);
    const [uf, setUF] = React.useState('AC');
    const [listMunicipio, setListMunicipio] = React.useState([]);
    const [listDivOrgao, setListDivOrgao] = useState([]);
  // const history = useHistory();

  
  

  useEffect(() => {
    if(id){
      api.get(`/orgao/visualizar/${id}`)
        .then((response) => {
          setValues(response.data);
          console.log(response.data);
        })
    }
  }, []);

  function loadDivOrgao() {
    api.get(`/divorgao/listar`)
        .then((response) => {
    setListDivOrgao(response.data.content);
    // console.log(response.data.content);
  })};
  
  function loadMunicipio(id) {
    if(id){
      api.get(`/municipio/listaporuf/${id}`)
        .then((response) => {
          // setListMunicipio([response.data.content]);
          setListMunicipio({ content_municipio: response.data.content });
        })
    }
  };

  useEffect(() => {
    loadDivOrgao();
  });
  
  
  function onChange(ev) {
    console.log(ev.target.value);
    // const { name, value } = ev.target;
    // setValues({ ...values, [name]: value});
    // setUF(value);
    // console.log(value);
  }

  // function onSubmit(ev) {
  //   ev.preventDefault();
  //   api.post(`/orgao/cadastrar/`, values)
  //     .then((response) => {
  //       history.push('/');
  //     });
  // }
  // const { content_municipio } = this.state;
  
  return (
    <div className="div-orgao">
      <h3>Cadastro de Órgãos</h3>
    
      <div>
        <br/>
        <br/>
      <form  className="orgao-form__orgao" noValidate autoComplete="on"> {/* onSubmit={onSubmit} */}
        <div key="desc_orgao"className="orgao-form__orgao">
          <label htmlFor="desc_orgao">Descrição do Orgão</label>
          <input className="orgao-form__orgao" id="desc_orgao" name="desc_orgao" type="text" onChange={onChange} value={values.desc_orgao} />
        </div>
        <div key="uf" className="orgao-form__orgao">
          <label htmlFor="uf">UF</label>
          <select id="uf" className="orgao-form__orgao" name="uf" onChange={onChange} value={values.uf}>
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
              <option value=""></option>
              {listDivOrgao.map((divOrg, index) => (
              <option key={index} value={divOrg.id_div_orgao}>{divOrg.descricao}</option>
              ))}
          </select>
            
        </div>

        {/* <div key="id_municipio" className="orgao-form__orgao">
          <label htmlFor="cod_municipio">Municipio</label>
          <select id="cod_municipio" className="orgao-form__orgao" name="cod_municipio" value={values.cod_mun}  onChange={onChange}>
              <option value=""></option>
              {listMunicipio.map((codMun, index) => (
               <option key={index}>
                  {codMun.desc_mun}
               </option>
              ))}


          </select>
        </div> */}
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