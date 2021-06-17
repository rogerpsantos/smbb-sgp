import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../components/header/index';
import FormUsuario from '../../../components/cadastros/usuario/FormUsuario';
import EditUsuario from '../../../components/cadastros/usuario/EditUsuario';


const Usuario = () => {

  const { id } = useParams();

    if(id) {
      return (
        <div>
          <Menu>
            <div>
              <EditUsuario id={id ? Number.parseInt(id, 10) : null} />
            </div>
          </Menu>
        </div>
      );
    } else {
    return (
      <div>
        <Menu>
          <div>
            <FormUsuario />
          </div>
        </Menu>
      </div>
    );
  }
}

export default Usuario;