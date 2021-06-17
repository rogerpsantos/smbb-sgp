import React from 'react';
import Menu from '../../../components/header/index';
import TableIntervalo from '../../../components/cadastros/intervalo/TableIntervalo';


const ListIntervalo = () => {
  
    return (
      <div>
        <Menu>
          <div>
            <TableIntervalo/>
          </div>
        </Menu>
      </div>
    );
}

export default ListIntervalo;