import React from 'react';
import Menu from '../../../components/header/index';
import TableRegraObrigacao from '../../../components/cadastros/regraobrig/TableRegraObrigacao';


const ListRegraObrigacao = () => {
  
    return (
      <div>
        <Menu>
          <div>
            <TableRegraObrigacao/>
          </div>
        </Menu>
      </div>
    );
}

export default ListRegraObrigacao;