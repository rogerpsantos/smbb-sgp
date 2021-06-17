import React from 'react';
import Menu from '../../../components/header/index';
import TableProjeto from '../../../components/cadastros/projeto/TableProjeto';


const ListProjeto = () => {
  
    return (
      <div>
        <Menu>
          <div>
            <TableProjeto/>
          </div>
        </Menu>
      </div>
    );
}

export default ListProjeto;