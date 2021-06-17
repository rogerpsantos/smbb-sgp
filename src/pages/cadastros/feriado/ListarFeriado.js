import React from 'react';
import Menu from '../../../components/header/index';
import TableFeriado from '../../../components/cadastros/feriado/TableFeriado';


const ListFeriado = () => {
  
    return (
      <div>
        <Menu>
          <div>
            <TableFeriado/>
          </div>
        </Menu>
      </div>
    );
}

export default ListFeriado;