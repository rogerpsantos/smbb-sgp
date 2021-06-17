import React from 'react';
// import { useParams } from 'react-router-dom';
import Menu from '../../../components/header/index';
import TableOrgao from '../../../components/cadastros/orgao/TableOrgao';


const ListOrgao = () => {
  
    return (
      <div>
        <Menu>
          <div>
            <TableOrgao/>
          </div>
        </Menu>
      </div>
    );
}

export default ListOrgao;