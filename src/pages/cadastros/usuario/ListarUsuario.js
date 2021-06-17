import React from 'react';
import Menu from '../../../components/header/index';
import TableUsuario from '../../../components/cadastros/usuario/TableUsuario';


const ListUsuario = () => {
  
    return (
      <div>
        <Menu>
          <div>
            <TableUsuario/>
          </div>
        </Menu>
      </div>
    );
}

export default ListUsuario;