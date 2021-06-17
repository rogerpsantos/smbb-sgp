import React from 'react';
import Menu from '../../../components/header/index';
import TableAgenda from '../../../components/cadastros/agenda/TableAgenda';


const ListAgenda = () => {
  
    return (
      <div>
        <Menu>
          <div>
            <TableAgenda/>
          </div>
        </Menu>
      </div>
    );
}

export default ListAgenda;