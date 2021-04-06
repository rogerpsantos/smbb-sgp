import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../components/header/index';
// import OrgaoForm from '../../components/orgao/FormOrgao';
import NewForm from '../../../components/cadastros/orgao/NewForm';


const Orgao = () => {

  const { id } = useParams();

    return (
      <div>
        <Menu>
          <div>
            <NewForm id={id ? Number.parseInt(id, 10) : null} />
          </div>
        </Menu>
      </div>
    );

}

export default Orgao;