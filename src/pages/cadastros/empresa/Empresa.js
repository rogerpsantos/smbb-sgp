import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../components/header/index';
import FormEmpresa from '../../../components/cadastros/empresa/FormEmpresa';
import EditEmpresa from '../../../components/cadastros/empresa/EditEmpresa';


const Empresa = () => {

  const { id } = useParams();

    if(id) {
      return (
        <div>
          <Menu>
            <div>
              <EditEmpresa id={id ? Number.parseInt(id, 10) : null} />
            </div>
          </Menu>
        </div>
      );
    } else {
    return (
      <div>
        <Menu>
          <div>
            <FormEmpresa />
          </div>
        </Menu>
      </div>
    );
  }
}

export default Empresa;