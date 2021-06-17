import React from 'react';
import { useParams } from 'react-router-dom';
import Menu from '../../../components/header/index';
import FormFeriado from '../../../components/cadastros/feriado/FormFeriado';
import EditFeriado from '../../../components/cadastros/feriado/EditFeriado';


const Feriado = () => {

  const { id } = useParams();

    if(id) {
      return (
        <div>
          <Menu>
            <div>
              <EditFeriado id={id ? Number.parseInt(id, 10) : null} />
            </div>
          </Menu>
        </div>
      );
    } else {
    return (
      <div>
        <Menu>
          <div>
            <FormFeriado />
          </div>
        </Menu>
      </div>
    );
  }
}

export default Feriado;