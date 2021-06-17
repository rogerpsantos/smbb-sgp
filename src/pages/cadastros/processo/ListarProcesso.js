import React from 'react';
import Menu from '../../../components/header/index';
import TableProcesso from '../../../components/cadastros/processo/TableProcesso';


const ListProcesso = () => {
  
    return (
      <div>
        <Menu>
          <div>
            <TableProcesso/>
          </div>
        </Menu>
      </div>
    );
}

export default ListProcesso;