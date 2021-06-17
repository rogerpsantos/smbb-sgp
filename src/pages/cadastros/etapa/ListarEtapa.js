import React from 'react';
import Menu from '../../../components/header/index';
import TableEtapa from '../../../components/cadastros/etapa/TableEtapa';


const ListEtapa = () => {
  
    return (
      <div>
        <Menu>
          <div>
            <TableEtapa/>
          </div>
        </Menu>
      </div>
    );
}

export default ListEtapa;