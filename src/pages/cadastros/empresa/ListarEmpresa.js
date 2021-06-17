import React from 'react';
import Menu from '../../../components/header/index';
import TableEmpresa from '../../../components/cadastros/empresa/TableEmpresa';


const ListEmpresa = () => {
  
    return (
      <div>
        <Menu>
          <div>
            <TableEmpresa/>
          </div>
        </Menu>
      </div>
    );
}

export default ListEmpresa;