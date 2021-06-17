import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../components/header/index';
import FormOrgao from '../../../components/cadastros/orgao/FormOrgao';
import EditOrgao from '../../../components/cadastros/orgao/EditOrgao';


const Orgao = () => {

  const { id } = useParams();

    if(id) {
      return (
        <div>
          <Menu>
            <div>
              <EditOrgao id={id ? Number.parseInt(id, 10) : null} />
            </div>
          </Menu>
        </div>
      );
    } else {
    return (
      <div>
        <Menu>
          <div>
            <FormOrgao />
          </div>
        </Menu>
      </div>
    );
  }
}

export default Orgao;